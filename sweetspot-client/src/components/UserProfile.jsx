import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserProfile, saveUserProfile } from "../data/userProfile";
import "../styles/profile.css";
import "../components/components.css";
import { useNavigate } from "react-router-dom";


export default function Profile() {
  const { user, authLoading } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

const fetchLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      setProfile((prev) => ({
        ...prev,
        address: {
          ...(prev.address || {}),
          latitude,
          longitude,
        },
      }));
    },
    (error) => {
      console.error("Location error:", error);
      alert("Location permission denied");
    }
  );
};

  // ✅ STYLE OBJECT GOES HERE
  const fieldStyle = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  };

  useEffect(() => {
  if (profile && !profile.address?.latitude) {
    fetchLocation();
  }
}, [profile]);

  useEffect(() => {
    if (authLoading) return;

    const loadProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await getUserProfile(user.uid);

        if (!data) {
          console.error("Profile missing in Firestore");
          setLoading(false);
          return;
        }

        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user, authLoading]);

  const handleSave = async () => {
  setSaving(true);
  try {
    await saveUserProfile(user.uid, profile);
    alert("Profile updated successfully");

    // ✅ Redirect to homepage
    navigate("/");
  } catch (err) {
    console.error("Save failed", err);
    alert("Failed to save profile");
  } finally {
    setSaving(false);
  }
};


  if (authLoading || loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;
  if (!profile) return <p>Profile not available</p>;

  return (
  <div className="profile-container">
    <h2 className="profile-title">My Profile</h2>

    <div className="profile-field">
      <label>Email</label>
      <input value={profile.email || ""} disabled />
    </div>

    <div className="profile-field">
      <label>First Name</label>
      <input
        value={profile.firstName || ""}
        onChange={(e) =>
          setProfile({ ...profile, firstName: e.target.value })
        }
      />
    </div>

    <div className="profile-field">
      <label>Last Name</label>
      <input
        value={profile.lastName || ""}
        onChange={(e) =>
          setProfile({ ...profile, lastName: e.target.value })
        }
      />
    </div>

    <div className="profile-field">
      <label>Phone</label>
      <input
        value={profile.phone || ""}
        onChange={(e) =>
          setProfile({ ...profile, phone: e.target.value })
        }
      />
    </div>

    <h3 className="profile-subtitle">Address</h3>

    <div className="profile-grid">
      <div className="profile-field">
        <label>Street</label>
        <input
          value={profile.address?.street || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              address: { ...profile.address, street: e.target.value },
            })
          }
        />
      </div>

      <div className="profile-field">
        <label>City</label>
        <input
          value={profile.address?.city || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              address: { ...profile.address, city: e.target.value },
            })
          }
        />
      </div>

      <div className="profile-field">
        <label>State</label>
        <input
          value={profile.address?.state || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              address: { ...profile.address, state: e.target.value },
            })
          }
        />
      </div>

      <div className="profile-field">
        <label>Postal Code</label>
        <input
          value={profile.address?.postalCode || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              address: { ...profile.address, postalCode: e.target.value },
            })
          }
        />
      </div>
    </div>

    <div className="profile-grid">
      <div className="profile-field">
        <label>Latitude</label>
        <input value={profile.address?.latitude || ""} disabled />
      </div>

      <div className="profile-field">
        <label>Longitude</label>
        <input value={profile.address?.longitude || ""} disabled />
      </div>
    </div>

    <button className="profile-save-btn" onClick={handleSave} disabled={saving}>
      {saving ? "Saving..." : "Save Profile"}
    </button>
  </div>
);
}