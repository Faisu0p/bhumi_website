import React, { useState } from "react";
import { createBuilder } from "./apis/builderApi";
import MediaSection from "./components/MediaSection";
import './BuilderAddPage.css';

const BuilderAddPage = () => {
  const [formData, setFormData] = useState({
    city: "",
    builderCompleteName: "",
    builderShortName: "",
    builderLogo: null,
    yearsInRealEstate: 0,
    shortDescription: "",
    state: "",
    builderLogoRectangle: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "" ? "" : Math.max(0, Number(value)) });
  };

  // Function to update builderLogo with the uploaded image URL
  const updatebuilderLogo = (url) => {
    setFormData({ ...formData, builderLogo: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      builderLogo: Array.isArray(formData.builderLogo)
        ? formData.builderLogo[0]
        : formData.builderLogo,

      builderLogoRectangle: Array.isArray(formData.builderLogoRectangle)
      ? formData.builderLogoRectangle[0]
      : formData.builderLogoRectangle,
    };

    try {
      console.log("Form data before submission:", updatedFormData);
      const response = await createBuilder(updatedFormData);
      console.log("Builder Data Submitted:", response);
      alert("Builder information submitted successfully!");

      // Reset form data after successful submission
      setFormData({
        city: "",
        builderCompleteName: "",
        builderShortName: "",
        builderLogo: "",
        yearsInRealEstate: 0,
        shortDescription: "",
        state: "",
        builderLogoRectangle: "",
      });
    } catch (error) {
      console.error("Error submitting builder data:", error);
      alert("There was an error submitting the builder information.");
    }
  };

  return (
    <div className="builder-container builder-flex-center builder-page">
      <div className="builder-card builder-shadow builder-form-card">
        <h2 className="builder-text-center builder-text-danger">Builder Information Form</h2>
        <form onSubmit={handleSubmit}>

          {/* State Input */}
          <div className="builder-form-group">
            <label htmlFor="state" className="builder-form-label">Enter State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., Delhi"
            />
          </div>
          {/* City Input */}
          <div className="builder-form-group">
            <label htmlFor="city" className="builder-form-label">Enter City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., New Delhi"
            />
          </div>

          {/* Builder Complete Name Input */}
          <div className="builder-form-group">
            <label htmlFor="builderCompleteName" className="builder-form-label">Enter Builder Complete Name</label>
            <input
              type="text"
              name="builderCompleteName"
              value={formData.builderCompleteName}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., Bhumi Builders Pvt. Ltd."
            />
          </div>

          {/* Builder Short Name Input */}
          <div className="builder-form-group">
            <label htmlFor="builderShortName" className="builder-form-label">Enter Builder's Nick/Short Name</label>
            <input
              type="text"
              name="builderShortName"
              value={formData.builderShortName}
              onChange={handleChange}
              required
              className="builder-form-control"
              placeholder="e.g., Bhumi Builders"
            />
          </div>

          {/* Media Section for uploading Builder Logo Square */}
          <div className="builder-form-group">
            <label htmlFor="masterLayoutPlan" className="builder-form-label">Upload Builder Logo Square</label>
            <MediaSection 
            updateMasterLayoutPlan={updatebuilderLogo} 
            maxSize={1024 * 1024}
            previewStyle={{
              objectFit: "contain",
              width: "100%",       
              maxWidth: "250px",   
              height: "auto",      
              maxHeight: "250px",  
              margin: "0 auto",    
              display: "block"     
            }}
              /> 
          </div>

          {/* Builder Logo URL Input */}
          <div className="builder-form-group">
            <label htmlFor="builderLogo" className="builder-form-label">Builder Logo Square URL</label>
            <input
              type="text"
              id="builderLogo"
              name="builderLogo"
              value={formData.builderLogo}
              onChange={handleChange}
              className="builder-form-control"
              placeholder="e.g., https://example.com/logo.jpg"
            />
          </div>

          {/* Media Section for uploading Builder Logo Rectangle */}
          <div className="builder-form-group">
            <label htmlFor="builderLogoRectangle" className="builder-form-label">Upload Builder Logo Rectangle</label>
            <MediaSection 
            updateMasterLayoutPlan={(url) => setFormData({ ...formData, builderLogoRectangle: url })} 
            maxSize={1024 * 1024}
            previewStyle={{
              objectFit: "contain",
              width: "100%",          
              maxWidth: "250px",      
              height: "auto",         
              maxHeight: "150px",     
              margin: "0 auto",       
              display: "block"   
            }}
             /> 
          </div>

          {/* Builder Logo Rectangle URL Input */}
          <div className="builder-form-group">
            <label htmlFor="builderLogoRectangle" className="builder-form-label">Builder Logo Rectangle URL</label>
            <input
              type="text"
              id="builderLogoRectangle"
              name="builderLogoRectangle"
              value={formData.builderLogoRectangle}
              onChange={handleChange}
              className="builder-form-control"
              placeholder="e.g., https://example.com/logo-rectangle.jpg"
            />
          </div>


          {/* Years in Real Estate */}
          <div className="builder-form-group">
            <label htmlFor="yearsInRealEstate" className="builder-form-label">Enter Years in Real Estate</label>
            <div className="builder-input-group">
              <input
                type="number"
                id="yearsInRealEstate"
                name="yearsInRealEstate"
                value={formData.yearsInRealEstate || ""}
                onChange={handleNumberChange}
                onBlur={(e) => {
                  if (formData.yearsInRealEstate === "") {
                    setFormData({ ...formData, yearsInRealEstate: "" });
                  }
                }}
                required
                min="0"
                max="100"
                className="builder-form-control"
                placeholder="e.g., 10"
              />
              <span className="builder-input-group-text">Years</span>
            </div>
          </div>

          {/* Short Description */}
          <div className="builder-form-group">
            <label htmlFor="shortDescription" className="builder-form-label">Enter Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
              rows="3"
              className="builder-form-control"
              placeholder="e.g., We specialize in residential and commercial buildings."
            />
          </div>

          {/* Submit Button */}
          <div className="builder-flex-center">
            <button type="submit" className="builder-btn builder-btn-danger">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuilderAddPage;