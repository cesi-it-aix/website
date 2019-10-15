import AwesomeSlider from 'react-awesome-slider';
import styled from '@emotion/styled';

const AwsSliderStyles = styled.div`
    .aws-btn {
        --slider-height-percentage: 60%;
        --slider-transition-duration: 700ms;
        --organic-arrow-thickness: 4px;
        --organic-arrow-border-radius: 0px;
        --organic-arrow-height: 40px;
        --organic-arrow-color: #26456f;
        --control-button-width: 10%;
        --control-button-height: 25%;
        --control-button-background: transparent;
        --control-bullet-color: #2d5182;
        --control-bullet-active-color: #26456f;
        --loader-bar-color: #851515;
        --loader-bar-height: 6px;
    }
`;


const Slider = () => (
  <AwesomeSlider cssModule={AwsSliderStyles}>
      <div data-src='/mnt/d/Code/SiteBde/website/static/uploads/vente.jpg'></div>
      <div data-src='/mnt/d/Code/SiteBde/website/static/uploads/journal.jpg'></div>
      <div data-src='/mnt/d/Code/SiteBde/website/static/uploads/wei_affiche.jpg'></div>
      <div data-src='/mnt/d/Code/SiteBde/website/static/uploads/journal.jpg'></div>
  </AwesomeSlider>
);

export default Slider;