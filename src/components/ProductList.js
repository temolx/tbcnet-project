import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import carImage from '../img/carImage.svg'
import engine from '../img/engine.svg'
import lari from '../img/lari.svg'
import dollar from '../img/dollar.svg'
import checkmark from '../img/checkmark.svg'
import pencil from '../img/pencil.svg'
import box from '../img/box.svg'
import heart from '../img/heart.svg'
import axios from 'axios'
import wheel from '../img/wheel.svg'
import speed from '../img/speed.svg'
import gear from '../img/gear.svg'
import geoFlag from '../img/geoFlag.svg'
import usaFlag from '../img/usaFlag.svg'
import { SortDateData } from '../SortDateData'
import priceBox from '../img/priceBox.svg'
import { current } from 'immer'
import hot from '../img/hot.svg'

function ProductList({ mans }) {

    const periodRef = useRef();
    const dateRef = useRef();

    const dealType = useSelector(state => state.dealType)
    const selectedMans = useSelector(state => state.manufacturer)
    const selectedCats = useSelector(state => state.category)
    const priceRange = useSelector(state => state.priceRange)
    const categories = useSelector(state => state.allCategories)

    const[isGel, setIsGel] = useState(true);

    const[products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const[dropdownsVisible, setDropdownsVisible] = useState({
        period: false,
        date: false,
    });

    const[sortPeriod, setSortPeriod] = useState('3h');
    const[sortDate, setSortDate] = useState({
        id: 1,
        title: 'თარიღი კლებადი'
    });

    let currentDay = Number(new Date(Date.now()).toISOString().slice(8, 10));

    useEffect(() => {
        let joinedCats = selectedCats.join('.');

            axios.get(`https://api2.myauto.ge/ka/products?Cats=${joinedCats}`, {
                params: {
                    ForRent: dealType,
                    SortOrder: sortDate.id,
                    Period: sortPeriod,
                    Page: currentPage
                }
            }).then((res) => {
            setProducts(res.data.data.items);
            }).catch((err) => {
            console.log(err);
            });

            document.addEventListener('click', handleClick, true);

    }, [dealType, mans, sortDate.id, sortPeriod, selectedCats, selectedMans])

    const handleClick = (e) => {
        if (!periodRef.current.contains(e.target) || !dateRef.current.contains(e.target)) {
            setDropdownsVisible({
                period: false,
                date: false,
            })
        }
    }


  return (
    <div className='productPage'>
        <div className="products-header">
            <h1 className='product-quantity'>{ products.length } განცხადება</h1>

            <div className="sort-types">

                <div className="sort-box" onClick={() => setDropdownsVisible({
                    ...dropdownsVisible,
                    period: !dropdownsVisible.period
                })}>
                    <h1>ბოლო {sortPeriod.slice(0, 1)} {sortPeriod.includes('h') ? 'საათი' : (sortPeriod.includes('d') ? 'დღე' : (sortPeriod.includes('w') ? 'კვირა' : ''))}</h1>

                {dropdownsVisible.period ? <div className='sort-container sort-container-period' ref={periodRef}>
                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('3h')}>ბოლო 3 საათი</button></div>
                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('2h')}>ბოლო 2 საათი</button></div>
                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('1h')}>ბოლო 1 საათი</button></div>

                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('3d')}>ბოლო 3 დღე</button></div>
                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('2d')}>ბოლო 2 დღე</button></div>
                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('1d')}>ბოლო 1 დღე</button></div>

                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('3w')}>ბოლო 3 კვირა</button></div>
                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('2w')}>ბოლო 2 კვირა</button></div>
                    <div className='sort-bt-container'><div className="hover-bg"></div><button onClick={() => setSortPeriod('1w')}>ბოლო 1 კვირა</button></div>
                </div> : ''}
                
                </div>

                <div className="sort-box" onClick={() => setDropdownsVisible({
                    ...dropdownsVisible,
                    date: !dropdownsVisible.date
                })}>
                    <h1>{sortDate.title}</h1>

                {dropdownsVisible.date ? <div className='sort-container' ref={dateRef}>
                    {dropdownsVisible.date && SortDateData.map((data) => (
                        <div className='sort-bt-container' key={ data.id } onClick={() => setSortDate({
                            id: data.id,
                            title: data.title
                        })}>
                            <div className="hover-bg"></div>
                            <button>{ data.title }</button>
                        </div>
                    ))}
                </div> : ''}
                </div>
            </div>
        </div>
        
        {products && products.filter((el) => {
            if (priceRange !== '') {
                return el.price_value > priceRange.min && el.price_value < priceRange.max
            }
            else return el;
        }).filter((el) => {
            if (selectedMans.length !== 0) {
                return selectedMans.some((element) => element == el.man_id);
            }
            else return el;
        }).map((product) => (
        <div className="productList" key={ product.car_id }>
            <div className="product-container">
                    <div className="left">
                        <img src={carImage} alt="car image" className='productImage' />

                        <div className="product-text">
                        <div className="basic-info">
                            {mans.map((man) => {
                                return man.man_id == product.man_id ? <h2>{(currentDay + 1) - Number(product.order_date.slice(8, 10)) < 2 ? <span>ახალი</span> : ''}{ man.man_name + " " + product.car_model }</h2> : ''
                            })}

                            <h2 className='year'>{ product.prod_year } წ</h2>
                        </div>

                        <div className="specs"> 
                            <div className="spec">
                                <img src={engine} alt="engine icon" />
                                <h3>{ product.engine_volume } { product.fuel_type_id === 2 ? 'ბენზინი' : 'ჰიბრიდი' }</h3>
                            </div>

                            <div className="spec">
                                <img src={speed} alt="speedometer icon" />
                                <h3>{product.car_run_km} კმ</h3>
                            </div>

                            <div className="spec">
                                <img src={gear} alt="gear shifter icon" />
                                {product.gear_type_id === 2 ? <h3>ავტომატიკა</h3> : (product.gear_type_id === 1 ? <h3>მექანიკა</h3> : <h3>ტიპტრონიკი</h3>)} 
                            </div>

                            <div className="spec">
                                <img src={wheel} alt="wheel icon" />
                                {product.right_wheel ? <h3>მარჯვენა</h3> : <h3>მარცხენა</h3>}
                            </div>
                        </div>

                        <div className="specs-mobile">
                            <div className="spec-mobile">
                                <h3>{product.car_run_km} კმ</h3>
                            </div>

                            <div className="spec-mobile">
                                <h3>{ product.engine_volume } { product.fuel_type_id === 2 ? 'ბენზინი' : 'ჰიბრიდი' }</h3>
                            </div>

                            <div className="spec-mobile">
    
                                {product.gear_type_id === 2 ? <h3>ავტომატიკა</h3> : (product.gear_type_id === 1 ? <h3>მექანიკა</h3> : <h3>ტიპტრონიკი</h3>)} 
                            </div>

                            <div className="spec-mobile">
                                {categories.map((category) => {
                                    if (category.category_id == product.category_id) return (<h3>{ category.title }</h3>)
                                })}
                            </div>

                            <div className="spec-mobile">
                                {product.right_wheel ? <h3>საჭე მარჯვნივ</h3> : <h3>საჭე მარცხნივ</h3>}
                            </div>

                            <div className="spec-mobile">
                                <img src={product.location_id == 2 ? geoFlag : usaFlag} alt="Georgian flag" />
                                <h3>{ product.location_id == 2 ? 'თბილისი' : 'აშშ'}</h3>
                            </div>
                        </div>

                        <div className="views">
                            <div className="mobile-line"></div>
                            <img src={hot} alt="flame icon" />

                            {(currentDay + 1) - Number(product.order_date.slice(8, 10)) !== 0 ? <h3>{ product.views } ნახვა • { (currentDay + 1) - Number(product.order_date.slice(8, 10)) } დღის წინ</h3> : <h3>{ product.views } ნახვა • დღეს</h3>}
                        </div>
                    </div>

                    <div className="right">
                        <div className="right-container">
                        { !product.is_payd ? <div className='clearance-inactive-container'><h3 className='clearance'>განბაჟება: 2090 ₾</h3></div> : 
                        <div className='clearance-active-container'>
                            <img src={checkmark} alt="green checkmark" />
                            <h3 className='clearance-active'>განბაჟებული</h3>
                        </div> }

                        <div className="location">
                            <img src={product.location_id == 2 ? geoFlag : usaFlag} alt="Georgian flag" />
                            <h3>{ product.location_id == 2 ? 'თბილისი' : 'აშშ'}</h3>
                            {/* {product.for_rent ? <h3 style={{ color: "red" }}>ქირავდება</h3> : <h3 style={{ color: "green" }}>იყიდება</h3>} */}
                        </div>
                        </div>
                        
                        <div className='price-container'>
                            {isGel ? <h1 className='price'>{ product.price_value }</h1> : <h1 className='price'>{ product.price }</h1>}
                            <img src={isGel ? lari : dollar} alt="lari icon" onClick={() => setIsGel(!isGel)} />
                        </div>

                        <div className="bottom-icons">
                            <img src={pencil} alt="pencil icon" />
                            <img src={box} alt="box icon" />
                            <img src={heart} alt="heart icon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ))}
    </div>
  )
}

export default ProductList