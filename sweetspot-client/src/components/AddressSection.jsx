import { Pencil, MapPin } from "lucide-react";

export default function AddressSection({
  title = "Shipping Address",
  userProfile,
  isEditing,
  onEditToggle,
  onFieldChange,
}) {
  // ✅ SAFETY GUARD (THIS FIXES THE BLANK PAGE)
  if (!userProfile) return null;

  return (
    <div className="group bg-gray-50 p-8 rounded-3xl border border-rose-200 shadow-[0_4px_20px_rgba(244,63,94,0.2)] transition-all duration-300">
      
      {/* ================= HEADER ================= */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapPin className="text-rose-500" size={28} />
          <h2 className="text-2xl font-extrabold text-[rgba(79,79,79,0.66)] font-parastoo">
            {title}
          </h2>
        </div>

        <button
          onClick={onEditToggle}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-[1.03] ${
            isEditing
              ? "bg-rose-600 text-white hover:bg-rose-700"
              : "bg-rose-100 text-rose-600 hover:bg-rose-200"
          }`}
        >
          <Pencil size={18} />
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>

      {/* ================= VIEW MODE ================= */}
      {!isEditing && (
        <div className="space-y-4 px-6 py-5 text-gray-700 text-lg bg-gray-100 rounded-2xl border border-gray-200 shadow-inner">
          <Row label="👤" value={`${userProfile.firstName || "—"} ${userProfile.lastName || ""}`} />
          <Row label="📧" value={userProfile.email || "—"} />
          <Row label="📞" value={userProfile.phone || "—"} />

          <div className="flex gap-4 items-start">
            <MapPin size={20} className="text-rose-500 mt-1" />
            <div className="text-gray-600 space-y-1">
              <div>{userProfile.address?.street || "—"}</div>
              <div>
                {userProfile.address?.city || "—"}
                {userProfile.address?.zipCode
                  ? ` - ${userProfile.address.zipCode}`
                  : ""}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= EDIT MODE ================= */}
      {isEditing && (
        <div className="space-y-6 p-6 rounded-2xl bg-white/90 backdrop-blur-sm shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <InputBlock label="First Name" value={userProfile.firstName} onChange={(v) => onFieldChange("firstName", v)} />
            <InputBlock label="Last Name" value={userProfile.lastName} onChange={(v) => onFieldChange("lastName", v)} />
            <InputBlock label="Phone" value={userProfile.phone} onChange={(v) => onFieldChange("phone", v)} />
            <InputBlock label="Email" value={userProfile.email} onChange={(v) => onFieldChange("email", v)} />
          </div>

          <InputBlock
            label="Street Address"
            value={userProfile.address?.street || ""}
            onChange={(v) =>
              onFieldChange("address", { ...userProfile.address, street: v })
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputBlock
              label="City"
              value={userProfile.address?.city || ""}
              onChange={(v) =>
                onFieldChange("address", { ...userProfile.address, city: v })
              }
            />

            <InputBlock
              label="ZIP Code"
              value={userProfile.address?.zipCode || ""}
              onChange={(v) =>
                onFieldChange("address", { ...userProfile.address, zipCode: v })
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= SMALL HELPERS ================= */
function Row({ label, value }) {
  return (
    <div className="flex gap-4 items-center">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function InputBlock({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-lg font-semibold mb-2 text-[rgba(79,79,79,0.7)] font-parastoo">
        {label}
      </label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300
                   hover:border-rose-400 focus:ring-2 focus:ring-rose-400
                   transition-all"
      />
    </div>
  );
}
