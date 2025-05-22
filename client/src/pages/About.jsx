import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-intro">
        <p className="about-text">
          Welcome to <span className="mern">The Mern Estate App,</span> a modern
          and forward-thinking real estate platform designed to bridge the gap
          between property seekers and property providers through innovation,
          trust, and efficiency.
        </p>
        <p className="about-text">
          In today’s fast-paced and digitally driven world, the process of
          buying, renting, or investing in real estate should not be complicated
          or time-consuming. Recognizing this need, we established a
          solution-oriented platform that prioritizes user experience, accuracy,
          and accessibility. Our goal is to ensure that anyone — from first-time
          homebuyers to seasoned investors — can easily access relevant,
          up-to-date property listings tailored to their unique preferences and
          requirements.
        </p>
      </div>

      <div className="who-we-are">
        <h1 style={{marginBottom: "2rem", fontWeight: "bold"}}>Who We Are</h1>
        <p className="about-text">
          We are a passionate team of professionals combining deep industry
          knowledge with cutting-edge technology to redefine the way people
          engage with real estate. Our team includes real estate experts,
          software engineers, product designers, and support specialists — all
          committed to one shared mission: to empower individuals and
          organizations in making confident, well-informed real estate
          decisions.
        </p>
      </div>
      <div className="what-we-offer">
        <h1 style={{marginBottom: "2rem", fontWeight: "bold"}}>What We Offer</h1>
        <p className="about-text">
          Our platform allows registered agents to create and manage property
          listings, ensuring that prospective buyers and renters have access to
          a broad spectrum of reliable and verified real estate options. Whether
          you are looking for a family-friendly villa, a city-view apartment, a
          commercial property for your business, or a temporary rental for
          relocation, <span className="mern">The Mern Estate App</span> offers a robust set of
          tools to make your search straightforward and successful.
        </p>
        <p className="about-text">
          Through our carefully built features, users can:
        </p>
        <ul>
          <li>
            Browse and filter properties based on location, price range,
            property type, and amenities.
          </li>
          <li>
            View high-quality images and detailed property descriptions to aid
            decision-making.
          </li>
          <li>
            Explore recently listed properties, highlighting the most current
            opportunities on the market.
          </li>
          <li>
            Contact agents directly, schedule viewings, and request further
            information effortlessly.
          </li>
        </ul>
        <p className="about-text">
          For agents and property managers, our platform provides:
        </p>
        <ul>
          <li>
            Easy onboarding and listing creation with full control over property
            information.
          </li>
          <li>
            A streamlined dashboard for managing inquiries, updates, and sales
            activity.
          </li>
          <li>
            Visibility to a growing and engaged audience actively searching for
            real estate.
          </li>
        </ul>
      </div>
      <div className="our-vision">
        <h1 style={{marginBottom: "2rem", fontWeight: "bold"}}>Our Vision</h1>
        <p className="about-text">
          We envision a world where finding a place to live, work, or invest is
          no longer a daunting task but a seamless experience driven by
          transparency, innovation, and trust. We are committed to continuously
          evolving our platform to meet the needs of our users and adapt to the
          changing dynamics of the real estate market.
        </p>
      </div>
      <div className="our-commitment">
        <h1 style={{marginBottom: "2rem", fontWeight: "bold"}}>Our Commitment</h1>
        <p className="about-text">
          At <span className="mern">The Mern Estate App</span>, we do not just list properties —
          we help people find homes, start businesses, and invest in their
          futures. We are dedicated to maintaining the highest standards of
          integrity, user experience, and service excellence. Every listing,
          every interaction, and every decision made on our platform reflects
          our unwavering commitment to quality and customer satisfaction.
        </p>
      </div>
    </div>
  );
}

export default About;
