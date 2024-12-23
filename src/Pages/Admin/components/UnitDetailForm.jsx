import React from 'react';

const UnitDetailForm = ({ index, onChange, unitDetailData }) => {
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange(index, name, value);
  };

  return (
    <div className="unit-detail-form">
      <h4>Unit Detail {index + 1}</h4>

      {/* Space Type */}
      <select
        name="spaceType"
        value={unitDetailData.spaceType || ''}
        onChange={handleFieldChange}
      >
        <option value="">Select Space Type</option>
        <option value="Living Room">Living Room</option>
        <option value="Dining Room">Dining Room</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Bedroom">Bedroom</option>
        <option value="Study Room">Study Room</option>
        <option value="Servant Room">Servant Room</option>
        <option value="Bathroom">Bathroom</option>
        <option value="Pooja Room">Pooja Room</option>
        <option value="Balcony">Balcony</option>
        <option value="Storage">Storage</option>
      </select>


      {/* Unit Size */}
      <input
        type="number"
        name="unitSize"
        value={unitDetailData.unitSize || ''}
        onChange={handleFieldChange}
        placeholder="Unit Size (sq. ft.)"
      />

      {/* Furnished Status */}
      <select
        name="unitFurnishedStatus"
        value={unitDetailData.unitFurnishedStatus || ''}
        onChange={handleFieldChange}
      >
        <option value="">Select Furnished Status</option>
        <option value="Fully Furnished">Fully Furnished</option>
        <option value="Semi Furnished">Semi Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>
    </div>
  );
};

export default UnitDetailForm;
