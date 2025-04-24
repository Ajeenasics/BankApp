import React, { useEffect, useState } from 'react'
import ManagerSideBar from './ManagerSidebar'
import '../../Asserts/Styles/ManagerManageLoan.css'
import img2 from '../../Asserts/images/carbon_view-filled.png'
import axiosInstance from '../../apis/axiosinstance'
import imgurl from '../../apis/imgURL'
import { useNavigate, useParams } from 'react-router-dom'

function ManagerManageCreditCard() {

    const [DbData, setDbData] = useState([])
    const [verified, setverified] = useState(false)
    const [buttonState, setButtonState] = useState(false)
    const [vDbData, setVDbData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const ApplicationData = async () => {
        try {
            const response = await axiosInstance.post('/nonapprovedcreditapplication');
            setDbData(response?.data?.data || []);  // Fallback to empty array
        } catch (error) {
            console.error('Error fetching user data:', error);
            setDbData([]);  // Prevents undefined state
        }
    };
    

    // const VerifiedApplicationData = async () => {

    //     try {
    //         const response = await axiosInstance.post('/approvedcreditapplication')
    //         console.log('userlist', `response.data`)
    //         setVDbData(response.data.data)
    //     }
    //     catch (error) {
    //         console.error('error fetching user data?:', error)
    //     }

    // }

    const VerifiedApplicationData = async () => {
        try {
            const response = await axiosInstance.post('/approvedcreditapplication');
            setVDbData(response?.data?.data || []); // Fallback to empty array
        } catch (error) {
            console.error('Error fetching verified user data:', error);
            setVDbData([]);  // Prevents undefined state
        }
    };

    // for button css and switching the table
    const ApplicationState = () => {

        setverified(false);
        setButtonState(false)

    }

    // for button css and switching the table
    const VerifiedApplicationState = () => {

        setverified(true);
        setButtonState(true)

    }

    useEffect(() => {
        ApplicationData();
    }, [])
    useEffect(() => {
        VerifiedApplicationData();
    }, [])
    const filteredData = (verified ? vDbData : DbData).filter(data =>
        data?.userid?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (

        <div className='MML-MainDiv'>

            <div className='MML-MainDiv-ContainDiv'>

                <div>
                    <ManagerSideBar />
                </div>

                <div className='MML-MainDiv-ContainDiv-ContentDiv'>

                    <div className='MML-MainDiv-ContainDiv-HeaderDiv'>
                        <h1 className='MML-h1'>MANAGE </h1>
                        <h1 className='MML-h2'>CREDIT CARD</h1>
                    </div>
                    
                    <div className='MML-MainDiv-ContainDiv-ButtonDiv'>

                        <button className={buttonState == false ? 'MML-Button1' : 'MML-Button2'} id='appbutton' onClick={ApplicationState}>Application</button>
                        <button className={buttonState == false ? 'MML-Button2' : 'MML-Button1'} id='verifiedappbutton' onClick={VerifiedApplicationState}>Approved Application</button>

                    </div>

                    <div className='MML-MainDiv-ContainDiv-Content'>

                        <div className='row'>
                        <div className='col-8'><h3 className='MML-h3'>View Request</h3></div>
                            <div className='col-3'> <div className='MML-SearchDiv'>
                            <input 
                                type='text' 
                                placeholder='Search by name...' 
                                className='form-control MML-SearchInput' 
                                value={searchQuery} 
                                onChange={(e) => setSearchQuery(e.target.value)} 
                            />
                        </div></div>
                        </div>
                        <div className='MML-Table-Contain-Shadow'>
                            <table className='MML-Table'>

                                <thead className='MML-Table-thead '>

                                    <tr className='MML-Table-thead-tr '>

                                        <th className='MML-Table-thead-th-center '>S No</th>
                                        <th className='MML-Table-thead-th-center'>Profile</th>
                                        <th className='MML-Table-thead-th'>Name</th>
                                        <th className='MML-Table-thead-th'>Phone No</th>
                                        <th className='MML-Table-thead-th'>Address</th>
                                        <th className='MML-Table-thead-th'>DOB</th>
                                        <th className='MML-Table-thead-th'>Card Type</th>
                                        <th className='MML-Table-thead-th-center'>Credit Card Limit</th>
                                        <th className='MML-Table-thead-th-center'>Action</th>

                                    </tr>

                                </thead>

                                <tbody className='MML-Table-tbody'>

                                    {verified == false ? (
                                        filteredData?.length > 0 ? (

                                            filteredData?.map((data, index) => {

                                                return (

                                                    <tr className='MML-Table-tbody-tr' key={index}>

                                                        <td className='MML-Table-td-center'>{index + 1}.</td>
                                                        <td className='MML-Table-td-center'>
                                                            <img
                                                                src={`${imgurl}/${data?.userid?.userPicture?.originalname}`}
                                                                alt='Profile'
                                                                className='MML-img'
                                                            />
                                                        </td>{/* profile img */}
                                                        <td className='MML-Table-td'>{data?.userid?.username}</td>
                                                        <td className='MML-Table-td'>{data?.userid?.userContact}</td>
                                                        <td className='MML-Table-td'>
                                                            <p className='MML-Table-p'>{data?.userid?.userAddress}</p>
                                                            <p className='MML-Table-p-2'>{data?.userid?.userNumber}</p>
                                                        </td>
                                                        <td className='MML-Table-td'>{new Date(data?.userid?.userDate).toLocaleDateString('en-GB')}</td>
                                                        <td className='MML-Table-td'>{data?.cardtype}</td>
                                                        <td className='MML-Table-td-center'>₹{data?.creditcardlimit}</td>
                                                        <td className='MML-Table-td-center'><button className='MML-Button3' onClick={() => navigate(`/manager/managecreditcard/${data._id}`)}><img src={img2} alt='View Details' /></button></td>{/* eye icon */}

                                                    </tr>

                                                )

                                            })
                                        ) : (
                                            <tr>
                                                <td><p className=' text-center text-danger'>No Data Found</p></td>
                                            </tr>
                                        )
                                    ) : (

                                        //if the Approved status is true

                                        filteredData?.length > 0 ? (

                                            filteredData.map((data, index) => {

                                                return (

                                                    <tr className='MML-Table-tbody-tr' key={index}>

                                                        <td className='MML-Table-td-center'>{index + 1}.</td>
                                                        <td className='MML-Table-td-center'>
                                                            <img
                                                                src={`${imgurl}/${data?.userid?.userPicture?.originalname}`}
                                                                alt='Profile'
                                                                className='MML-img'
                                                            />
                                                        </td>{/* profile img */}
                                                        <td className='MML-Table-td'>{data?.userid?.username}</td>
                                                        <td className='MML-Table-td'>{data?.userid?.userContact}</td>
                                                        <td className='MML-Table-td'>
                                                            <p className='MML-Table-p'>{data?.userid?.userAddress}</p>
                                                            <p className='MML-Table-p-2'>{data?.userid?.userNumber}</p>
                                                        </td>
                                                        <td className='MML-Table-td'>{new Date(data?.userid?.userDate).toLocaleDateString('en-GB')}</td>
                                                        <td className='MML-Table-td'>{data?.cardtype}</td>
                                                        <td className='MML-Table-td-center'>₹{data?.creditcardlimit}</td>
                                                        <td className='MML-Table-td-center'><button className='MML-Button3' onClick={() => navigate(`/manager/managecreditcard/${data._id}`)}><img src={img2} alt='View Details' /></button></td>{/* eye icon */}

                                                    </tr>

                                                )

                                            })
                                        ) : (
                                            <tr>
                                                <td><p className=' text-center text-danger'>No Data Found</p></td>
                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>
                        </div>
                    </div>

                </div>

            </div>

        </div>

    )

}

export default ManagerManageCreditCard