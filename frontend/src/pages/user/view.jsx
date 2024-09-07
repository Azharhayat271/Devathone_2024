import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image1 from "./../../assets/images/user-grid/bg.png";
import User from "./../../assets/images/user-grid/user.png";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Grid = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/get-all-users'); // Update with your API endpoint
                const usersData = response.data;
                
                // Filter users based on role
                const doctors = usersData.filter(user => user.role === 'doctor');
                setUsers(doctors);
            } catch (err) {
                setError('Failed to fetch users.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <div className="dashboard-main-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                    <h6 className="fw-semibold mb-0">Doctors List</h6>
                    <ul className="d-flex align-items-center gap-2">
                        <li className="fw-medium">
                            <a href="index.html" className="d-flex align-items-center gap-1 hover-text-primary">
                                <Icon icon="solar:home-smile-angle-outline" className="icon text-lg" />
                                Dashboard
                            </a>
                        </li>
                        <li>-</li>
                        <li className="fw-medium">Doctors List</li>
                    </ul>
                </div>

                <div className="card h-100 p-0 radius-12">
                    <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3 justify-content-between">
                        <div className="d-flex align-items-center flex-wrap gap-3">
                            <span className="text-md fw-medium text-secondary-light mb-0">Show</span>
                            <select className="form-select form-select-sm w-auto ps-12 py-6 radius-12 h-40-px">
                                {[...Array(10).keys()].map(i => (
                                    <option key={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <form className="navbar-search">
                                <input type="text" className="bg-base h-40-px w-auto" name="search" placeholder="Search" />
                                <Icon icon="ion:search-outline" className="icon" />
                            </form>
                        </div>
                        <a href="view-profile.html" className="btn btn-primary text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center gap-2">
                            <Icon icon="ic:baseline-plus" className="icon text-xl line-height-1" />
                            Add New Doctor
                        </a>
                    </div>
                    <div className="card-body p-24">
                        <div className="row gy-4">
                            {users.map(user => (
                                <div key={user.id} className="col-xxl-3 col-md-6 user-grid-card">
                                    <div className="position-relative border radius-16 overflow-hidden">
                                        <img src={Image1} alt="" className="w-100 object-fit-cover" />
                                        <div className="dropdown position-absolute top-0 end-0 me-16 mt-16">
                                            <button type="button" data-bs-toggle="dropdown" aria-expanded="false" className="bg-white-gradient-light w-32-px h-32-px radius-8 border border-light-white d-flex justify-content-center align-items-center text-white">
                                                <Icon icon="entypo:dots-three-vertical" className="icon" />
                                            </button>
                                            <ul className="dropdown-menu p-12 border bg-base shadow">
                                                <li>
                                                    <a className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10" href="#">
                                                        Edit
                                                    </a>
                                                </li>
                                                <li>
                                                    <button type="button" className="delete-btn dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-danger-100 text-hover-danger-600 d-flex align-items-center gap-10">
                                                        Delete
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="ps-16 pb-16 pe-16 text-center mt--50">
                                            <img src={User} alt="" className="border br-white border-width-2-px w-100-px h-100-px rounded-circle object-fit-cover" />
                                            <h6 className="text-lg mb-0 mt-4">{user.name}</h6>
                                            <span className="text-secondary-light mb-16">{user.email}</span>

                                            <div className="center-border position-relative bg-danger-gradient-light radius-8 p-12 d-flex align-items-center gap-4">
                                                <div className="text-center w-50">
                                                    <h6 className="text-md mb-0">Specialization</h6>
                                                    <span className="text-secondary-light text-sm mb-0">{user.speciality}</span>
                                                </div>
                                                <div className="text-center w-50">
                                                    <h6 className="text-md mb-0">License</h6>
                                                    <span className="text-secondary-light text-sm mb-0">{user.medicalLicense}</span>
                                                </div>
                                            </div>
                                            <Link to={`/user-view/${user._id}`} className="bg-primary-50 text-primary-600 bg-hover-primary-600 hover-text-white p-10 text-sm btn-sm px-12 py-12 radius-8 d-flex align-items-center justify-content-center mt-16 fw-medium gap-2 w-100">
                                                View Profile
                                                <Icon icon="solar:alt-arrow-right-linear" className="icon text-xl line-height-1" />
                                            </Link>
    
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-24">
                            <span>Showing 1 to {users.length} of {users.length} entries</span>
                            <ul className="pagination d-flex flex-wrap align-items-center gap-2 justify-content-center">
                                <li className="page-item">
                                    <a className="page-link bg-neutral-300 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="javascript:void(0)">
                                        <Icon icon="ep:d-arrow-left" />
                                    </a>
                                </li>
                                {[1].map(num => (
                                    <li key={num} className="page-item">
                                        <a className="page-link text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px bg-primary-600 text-white" href="javascript:void(0)">{num}</a>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <a className="page-link bg-neutral-300 text-secondary-light fw-semibold radius-8 border-0 d-flex align-items-center justify-content-center h-32-px w-32-px text-md" href="javascript:void(0)">
                                        <Icon icon="ep:d-arrow-right" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grid;