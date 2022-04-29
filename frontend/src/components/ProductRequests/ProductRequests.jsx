import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../config";
import ProductRequestCard from '../ProductRequestCard/ProductRequestCard';
import queryString from "query-string";

// useEffect(() => {
//     const gt = async() => {
//       const getResult = await axios.get(`/api/approve-request?to=${ShopId}&from=${LS._id}&productID=${productID}`);
//       const user = getResult.data[0];
//       // console.log(getResult.data[0], "getResult.data[0]")
//       // getResult ? setIsRequested()
//       if(getResult.data)
//       {
//         setIsRequested(user)
//       }
//       // getResult  setIsRequested(user)
      
//       // console.log(JSON.stringify(user,null,2), "us");
      
//     }
//     // console.log('isRequested',JSON.stringify(isRequested,null,2));
//     gt();
//   }, []);



const ProductRequests = () => {

    

    const [approveRequestsToLsFromAnother, setApproveRequestsToLsFromAnother] = useState([]);
    const [productId, setProductid] =useState('');

    const location = useLocation();
    
   
    

    useEffect(() => {
        const s = location.search;
        const result = queryString.parse(location.search);
        const productid = result.productId;
    
        setProductid(productid)

        const g = async() => {
        const ls = JSON.parse(localStorage.getItem('admin'));
        
        // const gt = async() => {
          const {data} = await axios.get(`${API_URL}/api/approveRequest/${ls?._id}`);
          const filterRequests = data.map((d) => {
            // return d.productID == productId
          
        })
        //   const filterRequests = data.filter((d) => {
        //       return d.productID == productId
        //     // console.log(d, "d,,,,,");
        //   })
          console.log(filterRequests,"getResult???");
          setApproveRequestsToLsFromAnother(filterRequests)

        //   console.log(getResult,"getResult....")
        //   const user = getResult.data[0];
          // console.log(getResult.data[0], "getResult.data[0]")
          // getResult ? setIsRequested()
        }
        g();
        // console.log(a,"...")
          
      }, []);

      console.log(productId, "pid")

  



    //   console.log(approveRequestToLsFromAnother, "approveRequestToLsFromAnother")
    //   approveRequestToLsFromAnother?.map(s => {
    //     console.log("s",s)
    // })

    //   useEffect(() => {
    //     const getShop = async() => {
        // const ls = JSON.parse(localStorage.getItem('admin'));
        
        const gs = async() => {
            // const productID = a?.productID;
        //   const shop = await axios.get(`${API_URL}/api/shops/${approveRequestsToLsFromAnother?.users[1]}`);  
        //   console.log(shop,"sho???")
        //   const filterProduct = shop?.products?.filter(product => {
        //     product._id == productID;
        //   })
        //   setFil(filterProduct)
        //   setA(shop.data)

        //   console.log(shop,"shop....")
            
        //   const user = getResult.data[0];
          // console.log(getResult.data[0], "getResult.data[0]")
          // getResult ? setIsRequested()
        }
        gs();
          
    //   }, []);
    

  return (
    <div>
        {approveRequestsToLsFromAnother?.map(approveRequest => {
            return(
            <ProductRequestCard singleRequest={approveRequest} key={approveRequest} />
            )
        })}
        {/* <div className="product-name">{approveRequestToLsFromAnother[0]?.users[1]}</div> */}
        {/* <div className="from">{fil}</div> */}
    </div>
  )
}

export default ProductRequests