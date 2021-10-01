import React, { useState } from "react";
import "./Section.css";
import {NavLink} from 'react-router-dom'

const Section = ({ catFilter }) => {
  const [query, setQuery] = useState([]);
  const [category, setCategory] = useState([
    { id: "0", name: "Science", isChecked: false },
    { id: "1", name: "Food", isChecked: false },
    { id: "2", name: "Politics", isChecked: false },
    { id: "3", name: "Gaming", isChecked: false },
    { id: "4", name: "Religion", isChecked: false },
    { id: "5", name: "Coding", isChecked: false },
    { id: "6", name: "Space", isChecked: false },
  ]);

  // const cat = [
  //   {id:'0' , value: "Science" , isChecked : false},
  //   {id:'1' , value: "Food", isChecked : false},
  //   {id:'2' , value: "Politics", isChecked : false},
  //   {id:'3' , value: "Gaming", isChecked : false},
  //   {id:'4' , value: "Religion", isChecked : false},
  //   {id:'5' , value: "Coding", isChecked : false},
  //   {id:'6' , value: "Space", isChecked : false}
  // ]

  // useEffect(() =>{
  //     setCategory(cat)
  // },[])

  const handleChange = (e) => {
    const { name, checked } = e.target;

    const update = category.map((curr) =>
      curr.name === name
        ? { ...curr, isChecked: checked } //usi curr object mai hai isliye curr.isChecked nahi kiya
        : curr
    );

    setCategory(update);

    console.log(category);
  };

  const handleFilter = () => {
    var cnt = 0;
    var i = 0;

    for (i = 0; i < 7; i++) {
      if (category[i].isChecked === true) {
        query.push(category[i].name);
        cnt = cnt + 1;
      }
    }

    // const filter = category.filter(curr => {
    //   curr.isChecked === true
    //   cnt = cnt+1;
    // })

    if (cnt === 7) {
      //all selected

      handleReset();
      setQuery([]);

      catFilter("");
    } else if (cnt === 0) {
      alert("Please Select A Category");
    } else {
      console.log(query);
      catFilter(query);
      //to send this array to filter blogs
    }

    setQuery([]);
  };

  const handleReset = () => {
    const reset = category.map((curr) => ({ ...curr, isChecked: false })); //to update a field in an object , we have to use spread operator.
    // curr.isChecked = false or curr.isChecked : false will not work

    setCategory(reset);
    catFilter("");
  };

  return (
    <div>
      <div className="accordion" id="accordionPanelsStayOpenExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
            >
              Discover more of what matters to you...
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseOne"
            className="accordion-collapse collapse show d-flex justify-content-center"
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">
              <div class="form-check">
                {category.map((curr) => (
                  <div key={curr.id}>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name={curr.name}
                      onChange={handleChange}
                      checked={curr.isChecked || false}
                      id={curr.id}
                    />
                    <label class="form-check-label" for={curr.id}>
                      {curr.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="d-flex mt-2">
                <button className="btn btn-edit" onClick={handleFilter}>
                  Filter
                </button>
                <button className="btn btn-delete" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item know-more">
          <h2 className="accordion-header" id="panelsStayOpen-headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseThree"
              aria-expanded="false"
              aria-controls="panelsStayOpen-collapseThree"
            >
              Know More...
            </button>
          </h2>
          <div
            id="panelsStayOpen-collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="panelsStayOpen-headingThree"
          >
            <div className="accordion-body links">
              <NavLink to='/' exact>Help</NavLink>&nbsp;
              <NavLink to='/' exact>Privacy</NavLink>&nbsp;
              <NavLink to='/' exact>Terms</NavLink>&nbsp;
              <NavLink to='/' exact>About</NavLink>&nbsp;
              <NavLink to='/' exact>Careers</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
