import React, { useState, useEffect } from 'react'
import axios from 'axios'
import car from '../img/car.svg'
import carActive from '../img/car-active.svg'
import tractor from '../img/tractor.svg'
import tractorActive from '../img/tractor-active.png'
import bike from '../img/bike.svg'
import bikeActive from '../img/bike-active.png'
import { useDispatch } from 'react-redux'
import { setDealType } from '../actions/FilterAction'
import { setMan } from '../actions/FilterAction'
import { setCat } from '../actions/FilterAction'
import { useRef } from 'react'
import { setPriceRange } from '../actions/FilterAction'
import { setAllCategories } from '../actions/CategoriesAction'

function Search() {

    const dispatch = useDispatch();

    const[mans, setMans] = useState([]);
    const[categories, setCategories] = useState([]);

    const[vehicleType, setVehicleType] = useState('is_car');
    const[models, setModels] = useState('');

    const[selectedMans, setSelectedMans] = useState([]);
    const[selectedCats, setSelectedCats] = useState([]);
    const[selectedDeals, setSelectedDeals] = useState([]);
    const[range, setRange] = useState({
        min: '',
        max: ''
    })

    const[dropdownsVisible, setDropdownsVisible] = useState({
        man: false,
        cat: false,
        type: false
    })

    const manRef = useRef();
    const catRef = useRef();
    const typeRef = useRef();
    const typeCheckboxRef0 = useRef();
    const typeCheckboxRef1 = useRef();

    useEffect(() => {
        axios.get(`http://static.my.ge/myauto/js/mans.json`)
            .then((res) => {
                setMans(res.data);
                // console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })

        axios.get(`https://api2.myauto.ge/ka/cats/get`)
            .then((res) => {
                setCategories(res.data.data);
                dispatch(setAllCategories(res.data.data));
                // console.log(res.data.data);
            }).catch((err) => {
                console.log(err);
            })

        axios.get(`https://api2.myauto.ge/ka/getManModels`, {
            params: {
                man_id: 30
            }
        }).then((res) => {
            setModels(res.data.data);
            // console.log(res.data.data);
        }).catch((err) => {
               console.log(err);
        })

        document.addEventListener('click', handleClick, true);

    }, [])

    const handleClick = (e) => {
        if (!manRef.current.contains(e.target) && !catRef.current.contains(e.target) && !typeRef.current.contains(e.target)) {
            setDropdownsVisible({
                man: false,
                cat: false,
                type: false
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(setMan(selectedMans));
        dispatch(setCat(selectedCats));

        if (range.min !== '' || range.max !== '') {
            dispatch(setPriceRange(range.min, range.max));
        }

        if (selectedDeals.length !== 0) {
            dispatch(setDealType(selectedDeals));
        }

        setDropdownsVisible({
            man: false,
            cat: false,
            type: false
        })
    }

    const checkManufacturer = (e) => {
        if (!selectedMans.some(el => el == e.target.value)) {
            setSelectedMans([...selectedMans, e.target.value]);
        }
        else {
            const filteredMans = selectedMans.filter((el) => {
                return el !== e.target.value;
            })
            setSelectedMans(filteredMans);
        }
    }

    const checkCategory = (e) => {
        if (!selectedCats.some(el => el == e.target.value)) {
            setSelectedCats([...selectedCats, e.target.value]);
        }
        else {
            const filteredCats = selectedCats.filter((el) => {
                return el !== e.target.value;
            })
            setSelectedCats(filteredCats);
        }
    }

    const checkType = (e) => {
        if (!selectedDeals.some(el => el == e.target.value)) {
            setSelectedDeals([...selectedDeals, e.target.value]);
        }
        else {
            const filteredDeals = selectedDeals.filter((el) => {
                return el !== e.target.value;
            })
            setSelectedDeals(filteredDeals);
        }
    }

  return (
    <div className='search'>

        <div className="vehicle-type">
            <div className="icons">
                <div className={vehicleType === 'is_car' ? "icon activeIcon" :"icon"}>
                    <img src={vehicleType === 'is_car' ? carActive : car} alt="car icon" onClick={() => setVehicleType('is_car')} className={vehicleType === 'is_car' ? "vehicle-type-active" : ""} />

                    <div className={vehicleType === 'is_car' ? "vehicle-line-active" : "vehicle-line"}></div>
                </div>

                <div className={vehicleType === 'is_spec' ? "icon activeIcon" :"icon"}>
                    <img src={vehicleType === 'is_spec' ? tractorActive : tractor} alt="tractor icon" onClick={() => setVehicleType('is_spec')} className={vehicleType === 'is_spec' ? "vehicle-type-active" : ""} />

                    <div className={vehicleType === 'is_spec' ? "vehicle-line-active" : "vehicle-line"}></div>
                </div>


                <div className={vehicleType === 'is_moto' ? "icon activeIcon" :"icon"}>
                    <img src={vehicleType === 'is_moto' ? bikeActive : bike} alt="bike icon" onClick={() => setVehicleType('is_moto')} className={vehicleType === 'is_moto' ? "vehicle-type-active" : ""} />

                    <div className={vehicleType === 'is_moto' ? "vehicle-line-active" : "vehicle-line"}></div>
                </div>
            </div>
        </div>
        
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="filter-input">
                <label htmlFor='deals'>გარიგების ტიპი</label>
                <div className="filter-box" onClick={() => setDropdownsVisible({
                    ...dropdownsVisible,
                    type: !dropdownsVisible.type
                })}>იყიდება</div>

                <div className={dropdownsVisible.type ? "type-checkbox-container" : "type-checkbox-container-hidden"} ref={typeRef}>
                    <div className="type-checkbox">
                        <input type="checkbox" value={0} name="type" onChange={(e) => checkType(e)} ref={typeCheckboxRef0} />
                        <label htmlFor="type">იყიდება</label>
                    </div>

                    <div className="type-checkbox">
                        <input type="checkbox" value={1} name="type" onChange={(e) => checkType(e)} ref={typeCheckboxRef1} />
                        <label htmlFor="type">ქირავდება</label>
                    </div>
                </div>
            </div>

            <div className="filter-input">
                <label>მწარმოებელი</label>
                <div className="filter-box" onClick={() => setDropdownsVisible({
                    ...dropdownsVisible,
                    man: !dropdownsVisible.man
                })}>ყველა მწარმოებელი</div>

                <div className={dropdownsVisible.man ? "manCheckbox-container" : "manCheckbox-container-hidden"} ref={manRef}>
                    {mans && mans.map((man) => (
                        <div className='manCheckbox'>
                            <input type="checkbox" value={ man.man_id } name="manufacturer" onChange={(e) => checkManufacturer(e)} />
                            <label htmlFor="manufacturer">{ man.man_name }</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="filter-input">
                <label htmlFor='category'>კატეგორია</label>
                <div className="filter-box" onClick={() => setDropdownsVisible({
                    ...dropdownsVisible,
                    cat: !dropdownsVisible.cat
                })}>ყველა კატეგორია</div>

                <div className={dropdownsVisible.cat ? "catCheckbox-container" : "catCheckbox-container-hidden"} ref={catRef}>
                    {categories && categories.map((category) => (
                        <div className='catCheckbox'>
                            <input type="checkbox" value={ category.category_id } name="category" onChange={(e) => checkCategory(e)} />
                            <label htmlFor="category">{ category.title }</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="line"></div>

            <div className="price-input">
                <div className="priceInput-text">
                    <h1>ფასი</h1>
                </div>

                <div className="range">
                    <input type="text" placeholder='დან' onChange={(e) => setRange({
                        ...range,
                        min: Number(e.target.value)
                    })} />
                    <span />
                    <input type="text" placeholder='მდე' onChange={(e) => setRange({
                        ...range,
                        max: Number(e.target.value)
                    })} />
                </div>
            </div>

            <div className="search-btn-container">
                <button className='searchButton'>ძებნა 197,124</button>
            </div>
        </form>
    </div>
  )
}

export default Search