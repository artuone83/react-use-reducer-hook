import React, { useReducer, useState, useRef } from "react";
import "./style.css";

const initialValues = {
  name: '',
  email: '',
  phone: '',
  projectTypes: []
};

const projectTypes = [
  {
    id: 0,
    name: 'frontend',
    isChecked: false
  },
  {
    id: 1,
    name: 'backend',
    isChecked: false
  },
  {
    id: 2,
    name: 'devOps',
    isChecked: false
  }
];

const basicInfoReducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return {
        ...state,
        name: action.value
      }
      case 'email':
      return {
        ...state,
        email: action.value
      }
      case 'phone':
      return {
        ...state,
        phone: action.value
      }
      case 'reset':
      return {
        ...state,
        ...action.value
      }
      case 'ADD_PROJECT_TYPE':
      return {
        ...state,
        projectTypes: [...state.projectTypes, action.value]
      }
      case 'REMOVE_PROJECT_TYPE':
      return {
        ...state,
        projectTypes: action.value
      }
    default:
      return state
  }
}

const BasicInfo = ({onChange, values}) => {
  return (
    <>
      <h2>Basic Info</h2>
      <input name="name" id="name" type="text" value={values.name} onChange={onChange}/>
      <input name="email" id="email" type="email" value={values.email} onChange={onChange} />
      <input name="phone" id="phone" type="phone" value={values.phone} onChange={onChange} />
    </>
  );
};

const ProjectTypes = ({projects, handleClick}) => {
  return(
    <>
      <h2>Project Types</h2>
      <div className="project-types">
        {
          projects.map((project) => {
            return(
              <p 
                style={{background: project.isChecked ? 'orange' : 'gray'}}
                className="project-types__type"
                onClick={handleClick(project)}>
                  {project.name}
              </p>
            );
          })
        }
      </div>
    </>
  );
}

 const App = () => {
  const [basicInfo, dispatch] = useReducer(basicInfoReducer, initialValues);
  const [submitValues, setSubmitValues] = useState(initialValues);
  const [availableProjects, setAvailableProjects] = useState(projectTypes)

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitValues({
      name: basicInfo.name,
      email: basicInfo.email,
      phone: basicInfo.phone,
      projectTypes: basicInfo.projectTypes
    })

  };

  const handleInputChange = (e) => {
    dispatch({type: `${e.target.name}`, value: e.target.value});
  };

  const handleResetForm = () => {
    dispatch({type: 'reset', value: initialValues});
    setSubmitValues(initialValues);
    setAvailableProjects([
      {
        id: 0,
        name: 'frontend',
        isChecked: false
      },
      {
        id: 1,
        name: 'backend',
        isChecked: false
      },
      {
        id: 2,
        name: 'devOps',
        isChecked: false
      }
    ]);
    // setAvailableProjects(projectTypes);
  };

  const handleProjectClick = (project) => (event) => {
    const selected = availableProjects.find((availableProject) => availableProject.id === project.id);
    const includesInSelectedType = basicInfo.projectTypes.find((type) => type.id === selected.id);  
    
    dispatch({type: 'ADD_PROJECT_TYPE', value: selected});

  if (includesInSelectedType) {
    const foundIndex = basicInfo.projectTypes.findIndex((pt) => pt.name === includesInSelectedType.name)
    const currentSelectedTypes = [...basicInfo.projectTypes];
    currentSelectedTypes.splice(foundIndex, 1);
    dispatch({type: 'REMOVE_PROJECT_TYPE', value: currentSelectedTypes});
  }

    const selectedIndex = availableProjects.findIndex((availableProject) => availableProject.id === project.id);

    setAvailableProjects((prevState) => {
      const checkedProjects = [...prevState];
      checkedProjects[selectedIndex].isChecked = !checkedProjects[selectedIndex].isChecked;
      return([
        ...checkedProjects
      ])
    });
  };


  return (
    <div>
      <form onSubmit={handleSubmit} >
        <BasicInfo onChange={handleInputChange} values={basicInfo} />
        <input type="submit" />
        <input type="button" onClick={handleResetForm} value="Reset form" />
      <ProjectTypes 
        projects={availableProjects}
        handleClick={handleProjectClick}/>
      </form>
      <div>
        <h2>Submit values</h2>
        <p>Name: {submitValues.name}</p>
        <p>Email: {submitValues.email}</p>
        <p>Phone: {submitValues.phone}</p>
        <p>Project Types: {submitValues.projectTypes.map((pt) => pt.name)}</p>
      </div>
    </div>
  );
}

export default App;