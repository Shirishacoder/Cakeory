import React from 'react';

const FlavorSelect = ({ value, onChange }) => {
  const flavors = [
    'Vanilla', 'Chocolate', 'Strawberry', 'Red Velvet', 'Black Forest',
    'Butterscotch', 'Pineapple', 'Mango', 'Coffee', 'Lemon', 'Carrot', 'Funfetti'
  ];

  return (
    <div>
      <label className="block text-lg font-medium text-[rgba(79,79,79,0.66)] mb-3">
        Flavor*
      </label>
      <select
        name="flavor"
        value={value}
        onChange={onChange}
        className="w-full px-5 py-4 border border-gray-300 bg-white focus:outline-none focus:border-[rgba(224,99,99,0.85)] text-lg text-gray-700"
      >
        <option value="">Select Flavor*</option>
        {flavors.map((flavor) => (
          <option key={flavor} value={flavor}>
            {flavor}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FlavorSelect;
