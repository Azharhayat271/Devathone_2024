import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { getAllUsersAPI } from './../../API/users/getAllusers';
import { deleteUserAPI } from "./../../API/users/deleteUser";
import {
    Visibility, Edit, Delete, Clear as ClearIcon, Print as PrintIcon,
    FilterList as FilterIcon
} from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CSVLink } from 'react-csv';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Skeleton, CircularProgress, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';

// Define dialog animation variants
const dialogVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
};

const Table = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [anchorEl, setAnchorEl] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await getAllUsersAPI();
            if (error) {
                setError(error);
            } else {
                setUsers(data);
            }
            setLoading(false);
        };

        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        (statusFilter === 'All' || user.status === statusFilter) &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const handlePrint = () => {
        window.print();
    };

    const handleStatusFilterChange = (status) => {
        setStatusFilter(status);
        setAnchorEl(null);
    };

    const handleFilterMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterMenuClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    if (loading) return <div><Skeleton animation='wave'></Skeleton></div>;
    if (error) return <div>Error: {error}</div>;

    const getDefaultImage = (name, email) => {
        const initial = name ? name.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : '?');
        return `https://via.placeholder.com/40x40.png?text=${initial}`;
    };

    const csvHeaders = [
        { label: "Name", key: "name" },
        { label: "Email", key: "email" },
        { label: "Role", key: "role" },
        { label: "Status", key: "status" },
        { label: "Join Date", key: "createdAt" },
    ];

    const csvData = filteredUsers.map(user => ({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: new Date(user.createdAt).toLocaleDateString(),
    }));

    const handleDeleteClick = (userId) => {
        setUserToDelete(userId);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        if (userToDelete) {
            setLoadingDelete(true); // Set loading state to true
            const { error } = await deleteUserAPI(userToDelete);
            setLoadingDelete(false); // Set loading state to false

            if (error) {
                setError(error);
            } else {
                setUsers(users.filter(user => user._id !== userToDelete));
                setAlertMessage('User deleted successfully!'); // Set success message
            }

            setShowModal(false);
            setUserToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
        setUserToDelete(null);
    };

    const handleViewUser = (userId) => {
        navigate(`/user-view/${userId}`, { state: { userId } }); // Navigate to the view route with user ID
    };

    const handleEditUser = (userId) => {
        navigate(`/edit/${userId}`, { state: { userId } }); // Navigate to the edit route with user ID
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    };

    return (
        <div>
            <div className="dashboard-main-body">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                    <h6 className="fw-semibold mb-0">Users Grid</h6>
                    <a href="add-user.html" className="btn btn-primary text-sm btn-sm px-8 py-6 radius-8">
                        Add New User
                    </a>
                </div>

                <div className="card h-100 p-0 radius-12">
                    <div className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center flex-wrap gap-3">
                        <form className="navbar-search flex-grow-1 position-relative d-flex align-items-center me-3">
                            <input
                                type="text"
                                className="bg-base h-36-px w-100 ps-12"
                                name="search"
                                placeholder="Search by Name or Email"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <IconButton
                                    className="position-absolute end-0 top-50 translate-middle-y me-2 icon-button"
                                    onClick={handleClearSearch}
                                >
                                    <ClearIcon />
                                </IconButton>
                            )}
                        </form>
                        <IconButton onClick={handlePrint} className="icon-button me-2">
                            <PrintIcon />
                        </IconButton>
                        <CSVLink
                            data={csvData}
                            headers={csvHeaders}
                            filename="users-data.csv"
                            className="icon-button me-2"
                        >
                            <GetAppIcon />
                        </CSVLink>
                        <IconButton
                            onClick={handleFilterMenuOpen}
                            className="icon-button me-2"
                        >
                            <FilterIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleFilterMenuClose}
                            PaperProps={{
                                style: {
                                    maxHeight: 200,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleStatusFilterChange('All')}>All Statuses</MenuItem>
                            <MenuItem onClick={() => handleStatusFilterChange('active')}>Active</MenuItem>
                            <MenuItem onClick={() => handleStatusFilterChange('inactive')}>Inactive</MenuItem>
                            <MenuItem onClick={() => handleStatusFilterChange('approved')}>Approved</MenuItem>
                            <MenuItem onClick={() => handleStatusFilterChange('created')}>Created</MenuItem>
                        </Menu>
                    </div>
                    <div className="card-body p-24">
                        <div className="table-responsive scroll-sm">
                            <table className="table bordered-table sm-table mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">S.L</th>
                                        <th scope="col">Join Date</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Role</th>
                                        <th scope="col" className="text-center">Status</th>
                                        <th scope="col" className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img src={user.image ? user.image : getDefaultImage(user.name, user.email)} alt={user.name} className="w-40-px h-40-px rounded-circle flex-shrink-0 me-12 overflow-hidden" />
                                                    <div className="flex-grow-1">
                                                        <span className="text-md mb-0 fw-normal text-secondary-light">{user.name}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="text-md mb-0 fw-normal text-secondary-light">{user.email}</span></td>
                                            <td>{user.role}</td>
                                            <td className="text-center">
                                                <span className={`text-md mb-0 fw-normal ${user.status === 'active' ? 'text-success-600' : 'text-neutral-600'}`}>
                                                    {user.status}
                                                </span>
                                            </td>
                                            <td className="text-center">
                                                <div className="d-flex align-items-center gap-10 justify-content-center">
                                                    <IconButton
                                                        className="bg-info-focus bg-hover-info-200 text-info-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                        onClick={() => handleViewUser(user._id)}
                                                    >
                                                        <Visibility className="icon text-xl" />
                                                    </IconButton>
                                                    <IconButton
                                                        className="bg-success-focus text-success-600 bg-hover-success-200 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                        onClick={() => handleEditUser(user._id)}
                                                    >
                                                        <Edit className="icon text-xl" />
                                                    </IconButton>
                                                    <IconButton
                                                        className="remove-item-btn bg-danger-focus bg-hover-danger-200 text-danger-600 fw-medium w-40-px h-40-px d-flex justify-content-center align-items-center rounded-circle"
                                                        onClick={() => handleDeleteClick(user._id)}
                                                    >
                                                        <Delete className="icon text-xl" />
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mt-4">
                            <div className="text-secondary-dark fw-semibold">Showing {filteredUsers.length} of {users.length} users</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Confirmation Modal */}
            <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Confirm Delete</h5>
                        </div>
                        <div className="modal-body">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={dialogVariants}
                            >
                                <p>Are you sure you want to delete this user?</p>
                            </motion.div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleConfirmDelete} disabled={loadingDelete}>
                                {loadingDelete ? <CircularProgress size={24} /> : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MUI Snackbar for Alerts */}
            <Snackbar open={!!alertMessage} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success">
                    {alertMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Table;
