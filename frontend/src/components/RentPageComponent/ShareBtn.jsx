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
  // Note: Instagram does not support direct sharing of URLs like other platforms
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(url)}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="social-share flex gap-4 mt-6">
      <h1 className="text-lg gradient-text font-semibold">Share this listing</h1>

      <FacebookShareButton url={url} quote={title} className="social-share-button">
        <FacebookIcon size={32} round />
      </FacebookShareButton>


 
      <WhatsappShareButton url={url} className="social-share-button">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

   
    </div>
  );
};

export default SocialShare;
