import React from 'react'
import bg1 from '../assets/img/stubg.png'
import card1 from '../assets/img/card1.png'
import side1 from '../assets/img/side1.jpeg'
import side2 from '../assets/img/side2.jpeg'
import side3 from '../assets/img/side3.jpeg'
function Home() {
  return (
    <>
      <div className='home-page'>
        <div className='bg-img'>
          <div className='overlay'></div>
          <h1 className='text'>EDUCATE <br></br>YOURSELF</h1>
          <p className="text-p">Unlock your porential <br></br>With the best online courses</p>
          <button className='home-btn'>ENROLL NOW</button>
          <img src={bg1} className='bgimg'></img>
        </div>
      </div>

      <section className='course-section'>
        <h1 className='heading'>Our Courses</h1>
        <div className='container'>
          <div className='row'>

            <div className='card'>
              <i class="fa-solid fa-chart-line"></i>
              <h2>Digital <br />Margketing</h2>
              <p>Promote products and <br />sources online</p>
              <label htmlFor="45%"></label>
              <progress max="100" value="50" ></progress>
              <span>45%</span>
            </div>

            <div className='card'>
              <i class="fa-solid fa-rocket"></i>
              <h2>Coding for<br />Beginners</h2>
              <p>Learn the louses of<br />programming</p>
              <progress max="100" value="70"></progress>
              <span>70%</span>
            </div>

            <div className='card'>
              <i class="fa-solid fa-globe"></i>
              <h2> Environmental<br />Gludios</h2>
              <p>Explore the principles <br />of stiztegy</p>
              <progress max="100" value="30"></progress>
              <span>30%</span>
            </div>
          </div>
        </div>
      </section>

      <div className='home-section'>
        <h1>Upgrade Your Skills<i class="fa-solid fa-graduation-cap"></i></h1>
        <h5>Explore industry-focused courses designed for students and beginners.</h5>
        <div className='row'>

          <div className='card1'>
            <img src={card1} className='card-img' />
            <h2 className='crd-title1'>Practical Learning</h2>
            <p className='title-p'>Learn with real-time projects and hands-on practice sessions.</p>
          </div>


          <div className='card1'>
            <img src={card1} className='card-img' />
            <h2 className='crd-title1'>Expert Mentors</h2>
            <p className='title-p'>Get guidance and support from experienced trainers.</p>
          </div>


          <div className='card1'>
            <img src={card1} className='card-img' />
            <h2 className='crd-title1'>Online Courses</h2>
            <p className='title-p'>Study anytime and anywhere with flexible online classes.</p>
          </div>
        </div>
      </div>

      <div className='home-section1'>
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={side1} className="d-block w-100 slider-img" alt="img1" />
            </div>

            <div className="carousel-item">
              <img src={side2} className="d-block w-100 slider-img" alt="img2" />
            </div>
            <div className="carousel-item">
              <img src={side3} className="d-block w-100 slider-img" alt="img3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span></button>

          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span></button>
        </div>
      </div>

      <section className='footer'>
        <div className='container'>
          <div className='row'>
            <div className='footer-card'>
              <h2>Educate Yourself</h2>
              <p>
                Learn new skills with the best online courses and expert mentors.
              </p>
            </div>

            <div className='footer-card'>
              <h2>Quick Links</h2>
              <ul>
                <li>Home</li>
                <li>Courses</li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>

            <div className='footer-card'>
              <h2>Contact Us</h2>
              <p>Email : info@gmail.com</p>
              <p>Phone : +91 9876543210</p>
              <p>Bangalore, India</p>
            </div>

<div className='footer-card'>
   <h2>Follow Us</h2>
   <div className='social-icons'>
          <i className="fa-brands fa-facebook-f"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-twitter"></i>
          <i className="fa-brands fa-linkedin-in"></i>
        </div>
        </div>
          </div>
          <div>
 <hr />

    <p className='bootom'>
      © 2026 Educate Yourself | All Rights Reserved
    </p>
          </div>
          
        </div>
      </section>
    </>
  )
}

export default Home