import React from 'react'

const form_layout = () => {
    return (
        <div>

            <div className="dashboard-main-body">

                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                    <h6 className="fw-semibold mb-0">Input Layout</h6>
                    <ul className="d-flex align-items-center gap-2">
                        <li className="fw-medium">
                            <a href="index.html" className="d-flex align-items-center gap-1 hover-text-primary">
                                <iconify-icon icon="solar:home-smile-angle-outline" className="icon text-lg"></iconify-icon>
                                Dashboard
                            </a>
                        </li>
                        <li>-</li>
                        <li className="fw-medium">Input Layout</li>
                    </ul>
                </div>

                <div className="row gy-4">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Vertical Input Form</h5>
                            </div>
                            <div className="card-body">
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">First Name</label>
                                        <input type="text" name="#0" className="form-control" placeholder="Enter First Name" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" name="#0" className="form-control" placeholder="Enter Last Name" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="#0" className="form-control" placeholder="Enter Email" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Phone</label>
                                        <div className="form-mobile-field">
                                            <select className="form-select">
                                                <option>US</option>
                                                <option>US</option>
                                                <option>US</option>
                                                <option>US</option>
                                            </select>
                                            <input type="text" name="#0" className="form-control" placeholder="+1 (555) 000-0000" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Password</label>
                                        <input type="password" name="#0" className="form-control" placeholder="*******" />
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary-600">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Input Form With Icons</h5>
                            </div>
                            <div className="card-body">
                                <div className="row gy-3">
                                    <div className="col-12">
                                        <label className="form-label">First Name</label>
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="f7:person"></iconify-icon>
                                            </span>
                                            <input type="text" name="#0" className="form-control" placeholder="Enter First Name" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Last Name</label>
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="f7:person"></iconify-icon>
                                            </span>
                                            <input type="text" name="#0" className="form-control" placeholder="Enter Last Name" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Email</label>
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="mage:email"></iconify-icon>
                                            </span>
                                            <input type="email" name="#0" className="form-control" placeholder="Enter Email" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Phone</label>
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="solar:phone-calling-linear"></iconify-icon>
                                            </span>
                                            <input type="text" name="#0" className="form-control" placeholder="+1 (555) 000-0000" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">Password</label>
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="solar:lock-password-outline"></iconify-icon>
                                            </span>
                                            <input type="password" name="#0" className="form-control" placeholder="*******" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary-600">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Horizontal Input Form</h5>
                            </div>
                            <div className="card-body">
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">First Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="#0" className="form-control" placeholder="Enter First Name" />
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Last Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" name="#0" className="form-control" placeholder="Enter Last Name" />
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Email</label>
                                    <div className="col-sm-10">
                                        <input type="email" name="#0" className="form-control" placeholder="Enter Email" />
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Phone</label>
                                    <div className="col-sm-10">
                                        <div className="form-mobile-field">
                                            <select className="form-select">
                                                <option>US</option>
                                                <option>US</option>
                                                <option>US</option>
                                                <option>US</option>
                                            </select>
                                            <input type="text" name="#0" className="form-control" placeholder="+1 (555) 000-0000" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Password</label>
                                    <div className="col-sm-10">
                                        <input type="password" name="#0" className="form-control" placeholder="*******" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary-600">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Horizontal Input Form With Icons</h5>
                            </div>
                            <div className="card-body">
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">First Name</label>
                                    <div className="col-sm-10">
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="f7:person"></iconify-icon>
                                            </span>
                                            <input type="text" name="#0" className="form-control" placeholder="Enter First Name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Last Name</label>
                                    <div className="col-sm-10">
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="f7:person"></iconify-icon>
                                            </span>
                                            <input type="text" name="#0" className="form-control" placeholder="Enter Last Name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Email</label>
                                    <div className="col-sm-10">
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="mage:email"></iconify-icon>
                                            </span>
                                            <input type="email" name="#0" className="form-control" placeholder="Enter Email" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Phone</label>
                                    <div className="col-sm-10">
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="solar:phone-calling-linear"></iconify-icon>
                                            </span>
                                            <input type="text" name="#0" className="form-control" placeholder="+1 (555) 000-0000" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-24 gy-3 align-items-center">
                                    <label className="form-label mb-0 col-sm-2">Password</label>
                                    <div className="col-sm-10">
                                        <div className="icon-field">
                                            <span className="icon">
                                                <iconify-icon icon="solar:lock-password-outline"></iconify-icon>
                                            </span>
                                            <input type="password" name="#0" className="form-control" placeholder="*******" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary-600">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default form_layout