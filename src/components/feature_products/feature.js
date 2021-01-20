import { Row, Col, Image } from 'antd';
import './feature.css';

import watchImage from './images/watch.jpg';
import glassImage from './images/glass.jpg';
import bagpackImage from './images/bagpack.jpg';

const FeatureProducts = () => {

  const picStyle = {
        
        
  }
  return(
    <>
      <div className="bgColor block">
        <div className="container-fluid ">
          <div className="titleHolder ">
              <h2>Feature Products</h2>
          </div>
          <Row>
            <Col span={16}>
              {/* Image of Watch */}    
              <Row>
                <div className="container">
                  <Image 
                    src={watchImage}
                    width={"100%"}                  
                    preview= {false}
                    style={{ marginBottom: "10px",  border: "1px solid black" }}
                    className="image"                   
                  />
                  <div className="overlay">Watch</div>
                </div>
              </Row>
              {/* Image of Glass */} 
              <Row>
                <div className="container">
                  <Image 
                    src={glassImage}                  
                    width={"100%"}                                    
                    preview={false}
                    style={{ border: "1px solid black" }}
                    className="image"
                  />
                  <div className="overlayGlass">Glass</div>
                </div>                              
              </Row>
            </Col>
            <Col span={8}>
              {/* Image of Bagpack */}
              <Image 
                src={bagpackImage}
                height={"100%"}
                preview={false}
                style={{margin: "0 0  0 15px", border: "1px solid black"}}
              />
            </Col>
          </Row>
        </div>
      </div>    
    </>
  );
};

export default FeatureProducts;

