import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskPage=()=> {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    let [stateList,setStateList]=useState([]);
    let [citiesList,setCitiesList]=useState([]);
    let [countryId,setCountryId]=useState(null);
    let [stateId,setStateId]=useState(null);

    const fetchCountries= async()=>
    {
        axios.get('http://localhost:5000/api/countries') // Here due to cors error I have handle this api call using server in another folder.
        .then(response => {
            setCountries(response.data.data);
            console.log(response);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
        

    }

    const fetchStates= async()=>
    {
        
            // Fetching states for the selected country
            const res=await axios.get(`https://d32sbion19muhj.cloudfront.net/pub/interview/states`)
            console.log(res);
            setStates(res.data.data);
        
    }

    const fetchCities=async ()=>
    {
        
            // Fetching cities for the selected state
            const res=await axios.get(`https://d32sbion19muhj.cloudfront.net/pub/interview/cities`)
            console.log(res);
            setCities(res.data.data);
        
    }

    
    useEffect(() => {
        // Fetching everything required from api.
        fetchCountries();  
        fetchCities();
        fetchStates();
    }, []);


    useEffect(() => {
        
        // console.log(countryId);
        stateList=states.filter((st)=> {return st.country_id==countryId});
        setStateList(stateList);
        
    }, [countryId]);

    useEffect(()=>
    {
        // console.log(stateId);
       citiesList=cities.filter((ct)=>{return ct.state_id==stateId});
       setCitiesList(citiesList);
    },[stateId]);

    return (
        <div className="p-4 space-y-4 w-1/2 flex-col ml-auto mr-auto mt-20 bg-slate-600 rounded-md shadow-2xl">
            {/* <p>{countryId}-{stateId}-{stateList.length}</p> // did for checking purposes */}
            <label htmlFor="country" className="text-lg font-semibold">Country:</label>
            <select
                id="country"
                value={countryId}
                onChange={(e) => {setSelectedCountry(e.target.value); setCountryId(e.target.value);}}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
                <option value="">Select Country</option>
                {countries.length>0 && countries.map(country => (
                    <option key={country.id} value={country.id}>{country.name}</option>
                ))}
            </select>

            <label htmlFor="state" className="text-lg font-semibold">State:</label>
            <select
                id="state"
                value={stateId}
                onChange={(e) => setStateId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
                <option value="">Select State</option>
                { stateList.map(state => (
                    <option key={state.id} value={state.id}>{state.name}</option>
                ))}
            </select>

            <label htmlFor="city" className="text-lg font-semibold">City:</label>
            <select
                id="city"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            >
                <option value="">Select City</option>
                {citiesList.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                ))}
            </select>
        </div>
    );
}

export default TaskPage;
