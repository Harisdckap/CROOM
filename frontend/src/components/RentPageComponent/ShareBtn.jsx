import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
} from 'react-share';

const SocialShare = ({ url, title }) => {
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(url)}`;
  const instagramLink = 'https://www.instagram.com'; // Replace with your Instagram profile URL
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const twitterLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedinLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="social-share flex gap-4 mt-6">
      <h1>share this listings</h1>
      <a href={facebookLink} target="_blank" rel="noopener noreferrer">
        <FacebookIcon size={32} round />
      </a>
      
      <a href={twitterLink} target="_blank" rel="noopener noreferrer">
        <TwitterIcon size={32} round />
      </a>
      
      <a href={linkedinLink} target="_blank" rel="noopener noreferrer">
        <LinkedinIcon size={32} round />
      </a>
      
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <WhatsappIcon size={32} round />
      </a>
      
      <a href={instagramLink} target="_blank" rel="noopener noreferrer">
        <FaInstagram size={32} />
      </a>
    </div>
  );
};

export default SocialShare;
