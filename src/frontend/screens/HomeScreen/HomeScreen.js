import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts";
import "./HomeScreen.css";
import { HOME_SCREEN_IMG_LIGHT, HOME_SCREEN_IMG_DARK } from "./../../constants";
import { quotes } from "../../data";

export const HomeScreen = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="home-screen">
      <section className="home-screen-details">
        <h1 className="home-screen-title">Meet your modern note taking app</h1>
        <figure className="home-screen-quote">
          <blockquote>
            {quotes[Math.floor(Math.random() * quotes.length)]}
          </blockquote>
          <figcaption className="home-screen-quote-caption">
            ~ Haruki Murakami, <cite>Kafka on the Shore</cite>
          </figcaption>
        </figure>
        <p className="home-screen-desc">
          Manage your daily tasks and workflow in a modern way & boost your
          efficiency without any efforts by using Kafka.
        </p>
        <div className="home-screen-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/signup")}
          >
            Join Now
          </button>
          <Link to="/signin" className="link">
            Already have an account?
          </Link>
        </div>
      </section>
      <section className="home-screen-img">
        <img
          src={theme === "light" ? HOME_SCREEN_IMG_LIGHT : HOME_SCREEN_IMG_DARK}
          alt="Kafka - Notes App"
        />
      </section>
    </div>
  );
};
