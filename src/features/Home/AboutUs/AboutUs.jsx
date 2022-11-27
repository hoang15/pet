import { Container } from "@material-ui/core";
import React from "react";
import imgAbout from "../../../images/aboutus.jpg";
import imgCat from "../../../images/cat2.jpg";
import imgDog from "../../../images/dog2.jpg";
import "../../../sass/Home/AboutUs.scss";
export default function AboutUs() {
  return (
    <div className="AboutUs">
      <Container maxWidth="lg">
        <div className="post-gird">
          <div className="post-item">
            <img src={imgAbout} alt="" />
          </div>
          <div className="post-item">
            <h1>
              Make pets
              <span className="text-oranger"> Happy</span>
            </h1>
            <span>
              To protect the health of your pets, you need to know how to take
              care of them darling properly. So we provide services that
              generate routes Safely taking care of your pet, your pet best.
            </span>
          </div>
          <div className="post-item">
            <img src={imgCat} alt="" />
            <div className="item-content">
              <div className="text">
                <h2>Good price</h2>
                <span>
                  There are each type of service suitable for the vast majority
                  of lovers pet lovers all over the country.
                </span>
              </div>
            </div>
            <div className="blur"></div>
          </div>
          <div className="post-item">
            <img src={imgDog} alt="" />
            <div className="item-content">
              <div className="text">
                <h2>Healthy pets</h2>
                <span>
                  Create a strong cold environment for pets for the little ones
                  to have the best condition.
                </span>
              </div>
            </div>
            <div className="blur"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}
