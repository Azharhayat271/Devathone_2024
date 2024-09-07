import React from 'react'
import PageNot from "./../../assets/images/404.png"
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();
  //handle click function 
  const handleClick = () => {
    navigate("/")
  }
  return (
    <div>
      <div class="dashboard-main-body">

        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
          <h6 class="fw-semibold mb-0">404</h6>
          <ul class="d-flex align-items-center gap-2">
            <li class="fw-medium">
              <a href="index.html" class="d-flex align-items-center gap-1 hover-text-primary">
                <iconify-icon icon="solar:home-smile-angle-outline" class="icon text-lg"></iconify-icon>
                Dashboard
              </a>
            </li>
            <li>-</li>
            <li class="fw-medium">404</li>
          </ul>
        </div>

        <div class="card basic-data-table">
          <div class="card-body py-80 px-32 text-center">
            <img src={PageNot} alt="" class="mb-24" />
            <h6 class="mb-16">Page not Found</h6>
            <p class="text-secondary-light">Sorry, the page you are looking for doesn’t exist </p>
            <a class="btn btn-primary-600 radius-8 px-20 py-11" onClick={handleClick}>Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound;