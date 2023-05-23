import { env } from "../config";

export const posterImageUrl = (poster) => {
  const posterImg = poster.data.attributes.formats.small
  if(process.env.NODE_ENV === 'production'){
    return `${env('DIGITAL_OCEAN_SPACE_ENDPOINT')}/${posterImg.hash}.${posterImg.ext}`
  }else{
    return `${env('STRAPI_BASE_URL')}${posterImg.url}`
  }
  
}

export const bannerImageUrl = (banner) => {
  const bannerImg = banner.data.attributes.formats.large
  if(process.env.NODE_ENV === 'production'){
    return `${env('DIGITAL_OCEAN_SPACE_ENDPOINT')}/${bannerImg.hash}.${bannerImg.ext}`
  }else{
    return `${env('STRAPI_BASE_URL')}${bannerImg.url}`
  }
  
}