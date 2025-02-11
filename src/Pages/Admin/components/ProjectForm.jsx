import React, { useState } from 'react';
import './ProjectForm.css';
import MediaSection from './MediaSection';
import BuilderDropdown from './BuilderDropdown';
import LocationsDropdown from './LocationsDropdown';

const ProjectForm = ({ onNext, data }) => {

  const [projectData, setProjectData] = useState(data || {
    projectName: '',
    builderId: '',
    launchDate: '',
    city: '',
    locality: '',
    sublocality: '',
    companyName: '',
    shortCode: '',
    deliveryStatus: '',
    deliveryDate: '',
    reraNumber: '',
    totalTowers: '',
    totalResidentialUnits: '',
    totalCommercialUnits: '',
    projectType: '',
    sectorBriefing: '',
    projectBriefing: '',
    projectIsVerified: false,
    projectMedia: '',
    state: '',
    completeAddress: '',
    landmark: '',
    pinCode: '',
  });

{/* Secret key to auto-fill the form */}
  const secretKey = '001'; // Define your secret key

  const predefinedData = {
    projectName: '001',
    builderId: '2',
    launchDate: '2025-01-01',
    city: 'New York',
    locality: 'Manhattan',
    sublocality: 'Downtown',
    companyName: 'ABC Builders',
    shortCode: 'ABCD123',
    deliveryStatus: 'Under Construction',
    deliveryDate: '2025-12-01',
    reraNumber: 'RERA123456',
    totalTowers: '5',
    totalResidentialUnits: '500',
    totalCommercialUnits: '100',
    projectType: 'Residential',
    sectorBriefing: 'Residential development with amenities',
    projectBriefing: 'A large-scale residential project in the heart of the city.',
    projectIsVerified: false,
    projectMedia: 'http://example.com/media-url',
    state: 'New York',
    completeAddress: '123 Main St, Downtown, New York',
    landmark: 'Near Central Park',
    pinCode: '10001',
  };

  const handleProjectNameChange = (e) => {
    const value = e.target.value;
    setProjectData((prev) => ({ ...prev, projectName: value }));

    // If the secret key is entered, auto-fill the rest of the form
    if (value === secretKey) {
      setProjectData((prev) => ({
        ...prev,
        ...predefinedData,
      }));
    }
  }; //Secret key to auto-fill the form ends here



  const handleLocationChange = (newLocationData) => {
    setProjectData((prev) => ({
      ...prev,
      state: newLocationData.state.name,          
      city: newLocationData.city.name,            
      locality: newLocationData.locality.name,    
      sublocality: newLocationData.sublocality.name, 
      pinCode: newLocationData.pincode.pincode,           
    }));
  };
  
  
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'deliveryDate') {
      const launchDate = new Date(projectData.launchDate);
      const deliveryDate = new Date(value);

      if (deliveryDate <= launchDate) {
        alert('Delivery date must be after the launch date.');
        return;
      }

      const thirtyYearsAfterLaunch = new Date(launchDate);
      thirtyYearsAfterLaunch.setFullYear(launchDate.getFullYear() + 30);

      if (deliveryDate > thirtyYearsAfterLaunch) {
        alert('Delivery date cannot be more than 30 years after the launch date.');
        return;
      }
    }

    setProjectData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project form called", projectData);
    onNext(projectData);
  };

  const updateMediaUrl = (urls) => {
    if (Array.isArray(urls)) {
      const mediaString = urls.join(', ');
      setProjectData((prev) => ({ ...prev, projectMedia: mediaString }));
    } else {
      setProjectData((prev) => ({ ...prev, projectMedia: urls }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="project-form-container">
      <h2 className="project-form-title">Project Details</h2>

      <label className="project-form-label">Enter Project Name <span className="required-asterisk">*</span></label>
      <input
        type="text"
        name="projectName"
        value={projectData.projectName}
        onChange={handleProjectNameChange} // Secret key to auto-fill the form
        placeholder="Project Name"
        required
        maxLength={50}
        className="project-form-input"
      />

      <label className="project-form-label">Select Builder <span className="required-asterisk">*</span></label>
      <BuilderDropdown
        projectDetails={projectData}
        handleInputChange={handleChange}
        required={true}
      />

      <label className="project-form-label">Enter Launch Date <span className="required-asterisk">*</span></label>
      <input
        type="date"
        name="launchDate"
        value={projectData.launchDate}
        onChange={handleChange}
        className="project-form-input"
        onKeyDown={(e) => e.preventDefault()}
        required
      />

      {/* Locations Dropdown Component */}
      <LocationsDropdown
        locationData={projectData}
        onLocationChange={handleLocationChange}
      />

      <label className="project-form-label">Enter Complete Address <span className="required-asterisk">*</span></label>
      <input
        type="text"
        name="completeAddress"
        value={projectData.completeAddress}
        onChange={handleChange}
        required
        placeholder="Complete Address"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Landmark <span className="required-asterisk">*</span></label>
      <input
        type="text"
        name="landmark"
        value={projectData.landmark}
        onChange={handleChange}
        required
        placeholder="Landmark"
        className="project-form-input"
      />




      <label className="project-form-label">Enter Company Name <span className="required-asterisk">*</span></label>
      <input
        type="text"
        name="companyName"
        value={projectData.companyName}
        onChange={handleChange}
        required
        placeholder="Company Name"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Short Name of Project <span className="required-asterisk">*</span></label>
      <input
        type="text"
        name="shortCode"
        value={projectData.shortCode}
        onChange={handleChange}
        required
        placeholder="Short Code/Nick Name of Project"
        className="project-form-input"
      />

      <label className="project-form-label">Select Project Status <span className="required-asterisk">*</span></label>
      <select
        name="deliveryStatus"
        value={projectData.deliveryStatus}
        onChange={handleChange}
        required
        className="project-form-select"
      >
        <option value="">Select Project Status</option>
        <option value="Completed">Completed</option>
        <option value="Under Construction">Under Construction</option>
      </select>

      {projectData.deliveryStatus && (
        <div className="project-form-date-container">
          
          <label className="project-form-label">
            {projectData.deliveryStatus === 'Completed'
              ? 'Enter Completion Date'
              : 'Expected Completion Date'}
          </label>
          
          <input
            type="date"
            name="deliveryDate"
            value={projectData.deliveryDate}
            onChange={handleChange}
            required
            placeholder={projectData.deliveryStatus === 'Completed' ? 'Enter Completion Date' : 'Expected Completion Date'}
            className="project-form-input"
            onKeyDown={(e) => e.preventDefault()}
          />
        </div>
      )}

      <label className="project-form-label">Enter RERA Number <span className="required-asterisk">*</span></label>
      <input
        type="text"
        name="reraNumber"
        value={projectData.reraNumber}
        onChange={handleChange}
        required
        placeholder="RERA Number"
        className="project-form-input"
      />

      <label className="project-form-label">Select Project Type <span className="required-asterisk">*</span></label>
      <select
        name="projectType"
        value={projectData.projectType}
        onChange={handleChange}
        required
        className="project-form-select"
      >
        <option value="">Select Project Type</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Mixed">Mixed</option>
      </select>

      <label className="project-form-label">Enter Total Towers <span className="required-asterisk">*</span></label>
      <input
        type="number"
        name="totalTowers"
        value={projectData.totalTowers}
        required
        onChange={(e) => {
          const value = e.target.value;

          // Custom validation to enforce the max limit of 200
          if (value > 200) {
            alert("Total Towers cannot exceed 200.");
            return; // Prevent further execution if value is invalid
          }

          // Call the original handleChange function if value is valid
          handleChange(e);
        }}
        placeholder="Total Towers"
        min="0"
        max="200"
        className="project-form-input"
      />


      <label className="project-form-label">Enter Total Residential Units <span className="required-asterisk">*</span></label>
      <input
        type="number"
        name="totalResidentialUnits"
        value={projectData.totalResidentialUnits}
        onChange={(e) => {
          const value = e.target.value;
          // Custom validation for Total Residential Units
          if (value > 200) {
            alert("Total Residential Units cannot exceed 200.");
            return; // Prevent further execution if value is invalid
          }
          handleChange(e); // Call the original handleChange if value is valid
        }}
        placeholder="Total Residential Units"
        required
        min="0"
        className="project-form-input"
      />

      <label className="project-form-label">Enter Total Commercial Units</label>
      <input
        type="number"
        name="totalCommercialUnits"
        value={projectData.totalCommercialUnits}
        onChange={(e) => {
          const value = e.target.value;
          // Custom validation for Total Commercial Units
          if (value > 200) {
            alert("Total Commercial Units cannot exceed 200.");
            return; // Prevent further execution if value is invalid
          }
          handleChange(e); // Call the original handleChange if value is valid
        }}
        placeholder="Total Commercial Units"
        min="0"
        className="project-form-input"
      />


      <label className="project-form-label">Enter Sector Briefing <span className="required-asterisk">*</span></label>
      <textarea
        name="sectorBriefing"
        value={projectData.sectorBriefing}
        onChange={handleChange}
        placeholder="Sector Briefing"
        required
        className="project-form-textarea"
      />

      <label className="project-form-label">Enter Project Briefing <span className="required-asterisk">*</span></label>
      <textarea
        name="projectBriefing"
        value={projectData.projectBriefing}
        onChange={handleChange}
        required
        placeholder="Project Briefing"
        className="project-form-textarea"
      />

      <label className="project-form-label">Add Project Master Layout/Numbering Plan <span className="required-asterisk">*</span></label>

      <MediaSection
        // key={mediaSectionKeys.updateMediaUrl} // Unique key for the master layout plan MediaSection
        updateMasterLayoutPlan={updateMediaUrl}
        maxSize={1024 * 1024 * 5} // Max file size of 1 MB
        previewStyle={{
          objectFit: "contain",  
          width: "100%",        
          maxWidth: "1920px",   // Adjusted for wider display (landscape)
          height: "auto",       
          maxHeight: "1080px",   // Adjusted for a taller display (landscape)
          margin: "0 auto",      
          display: "block"       
        }}
        allowedTypes={["image/png", "image/jpeg"]} // Allow both PNG and JPEG formats
        labelText="Select Your Master Layout Plan"
        fileLabelText="Max Size: 5 MB | PNG, JPEG | Landscape (1920x1080)px"
        requiredWidth={1920}  // Required width for the layout plan
        requiredHeight={1080} // Required height for the layout plan
      />



      <input
        type="url"
        name="projectMedia"
        value={projectData.projectMedia}
        onChange={handleChange}
        placeholder="Project Media URL"
        required
        readOnly
        className="project-form-input"
      />

      <button type="submit" className="project-form-submit-button">Next</button>
    </form>

  );
  
};

export default ProjectForm;
