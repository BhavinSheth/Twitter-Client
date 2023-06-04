import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import Modal from 'react-modal'
import './editModal.css'
import { MdOutlineAddPhotoAlternate as AddImage } from 'react-icons/md'
import { TiDeleteOutline as RemoveImage } from 'react-icons/ti'
import { Avatar } from '@material-ui/core'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'
import EditInput from './EditInput'
import Chip from '@mui/material/Chip'
import { FcGoogle } from 'react-icons/fc'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/lab'

// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import EditTextArea from './EditTextArea'
import { TextField } from '@mui/material'
import EditBirthdate from './EditBirthdate'
import dayjs from 'dayjs'
import {
  SERVER_BASE_URL,
  START_SPINNER,
  STOP_SPINNER,
} from '../../context/globalConstants'
import { useAppContext } from '../../context/appContext'

function EditModal({
  openModal,
  modalIsOpen,
  afterOpenModal,
  closeModal,
  profile,
  getUserProfile,
}) {
  const {
    tweets,
    likes,
    commented,
    followers,
    following,
    liked,
    retweeted,
    ...restProfile
  } = profile

  const { configs, dispatch } = useAppContext()

  const [birthdate, setBirthdate] = useState(
    dayjs(profile.birthdate || '2001-05-11')
  )

  const handleDateChange = (date) => {
    setBirthdate(date)
  }

  const revertChanges = () => {
    setBannerCrop(profile.bannerImg)
    setAvatarCrop(profile.profileImg)
    setUpdatedProfile(restProfile)
  }

  const [editType, setEditType] = useState(null)
  const [bannerPreviewImg, setBannerPreviewImg] = useState(null)
  const [bannerCroppedImg, setBannerCroppedImg] = useState(profile.bannerImg)
  const [avatarImg, setAvatarImg] = useState(null)
  const [avatarCroppedImg, setAvatarCroppedImg] = useState(profile.profileImg)
  const [updatedProfile, setUpdatedProfile] = useState(restProfile)

  const [defaultBannerCrop, setBannerCrop] = useState({
    unit: '%',
    width: 100,
    height: 50,
    x: 0,
    y: 25,
  })

  const [avatarCrop, setAvatarCrop] = useState({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  })

  const emptyState = () => {
    setEditType(null)
    setBannerPreviewImg(null)
    setAvatarImg(null)
    // setBannerCroppedImg(null)
    // setAvatarCroppedImg(null)
    revertChanges()
  }

  const handleCloseModal = () => {
    emptyState()
    closeModal()
  }

  const handleImage = async (e, editType) => {
    setEditType(editType)
    editType === 'banner' &&
      toast.info("dont't change aspect ratio if possible")
    const image = e.target.files[0]
    // console.log(e.target.files)
    try {
      const base64PreviewImg = await getBase64EncodedImage(image)
      editType === 'banner'
        ? setBannerPreviewImg(base64PreviewImg)
        : setAvatarImg(base64PreviewImg)
    } catch (error) {
      console.log(error)
    }
  }

  const getBase64EncodedImage = async (image, isBlob) => {
    if (!image) console.log('no image found or image not loaded yet in state')

    if (isBlob) image = (await axios.get(image, { responseType: 'blob' })).data

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.readAsDataURL(image)
      reader.onloadend = () => {
        console.log(reader.result)
        resolve(reader.result)
      }
      reader.onerror = reject
    })
  }

  const removeAllImgData = () => {
    setBannerPreviewImg(null)
    setBannerCroppedImg(null)
  }

  const getCroppedImg = (image, crop) => {
    const canvas = document.createElement('canvas')
    console.log(canvas)
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty')
          return
        }
        blob.name = 'cropped-image.png'
        window.URL.revokeObjectURL(image.src)
        const croppedFile = new File([blob], blob.name, {
          type: 'image/png',
          lastModified: Date.now(),
        })
        resolve(URL.createObjectURL(croppedFile))
      }, 'image/png')
    })
  }

  const onCropComplete = (crop, image, editType) => {
    makeClientCrop(crop, image, editType)
  }

  const makeClientCrop = async (crop, img, editType) => {
    console.log('in makeClientCRop', crop, img, editType)
    if (!img) {
      console.log('image not loaded')
      return
    }
    if (crop.width && crop.height) {
      try {
        const image = new Image()
        image.src = img
        image.onload = async () => {
          const croppedImageUrl = await getCroppedImg(image, crop)
          console.log('%cMAIN URL : ' + croppedImageUrl, 'color: red')
          console.log(editType)
          editType === 'banner'
            ? setBannerCroppedImg(croppedImageUrl)
            : setAvatarCroppedImg(croppedImageUrl)
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleImageLoad = (image) => {
    // Set the initial crop to a circle centered in the image
    const aspect = 1
    const { naturalWidth, naturalHeight } = image.target
    const imageSize = Math.min(naturalWidth, naturalHeight)
    const radius = imageSize / 2
    const x = naturalWidth / 2 - radius
    const y = naturalHeight / 2 - radius
    const crop = {
      unit: 'px',
      x,
      y,
      width: radius * 2,
      height: radius * 2,
      aspect,
    }
    setAvatarCrop(crop)
  }

  const updateProfile = async () => {
    dispatch({ type: START_SPINNER })

    const avatar = await getBase64EncodedImage(avatarCroppedImg, true)
    const banner = await getBase64EncodedImage(bannerCroppedImg, true)
    const finalUpdatedProfile = {
      ...updatedProfile,
      birthdate: birthdate.toDate(),
      profileImg: avatar,
      bannerImg: banner,
    }

    try {
      const res = await axios.put(
        `${SERVER_BASE_URL}/${profile.userName}`,
        finalUpdatedProfile,
        configs
      )
      toast.success(`${res.data.message}`)
      closeModal()
      getUserProfile()
    } catch (error) {
      console.log(error)
      toast.error(error.response ? error.response.data.message : error.message)
    }
    dispatch({ type: STOP_SPINNER })
  }

  const handleChange = (e) => {
    // console.log(e, e.target.name, e.target.value)
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    setBannerCroppedImg(profile.bannerImg)
  }, [])

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'black',
            display: 'grid',
            borderRadius: '10px',
            zIndex: '100',
            border: 'none',
            padding: '0',
          },
          overlay: {
            backgroundColor: 'rgba(91, 112, 131, 0.4)',
            zIndex: '100',
          },
        }}
      >
        {editType === null ? (
          <div className="modal">
            <div className="modal-headers">
              <button className="btn follow-btn" onClick={updateProfile}>
                save
              </button>
              <div className="modal-title">edit profile</div>
              <CgClose
                className="close-notification position-initial"
                onClick={handleCloseModal}
              />
            </div>

            <div className="modal-images">
              <div className="modal-bannerImg">
                <input
                  type="file"
                  multiple
                  id="imageInput"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    handleImage(e, 'banner')
                  }}
                />
                <div className="banner">
                  <div className="banner-img-btn-container">
                    <label htmlFor="imageInput">
                      <AddImage type="file" className="icon edit" />
                    </label>
                    {bannerPreviewImg && (
                      <RemoveImage
                        className="icon edit"
                        onClick={removeAllImgData}
                      />
                    )}
                  </div>
                  <div>
                    <div className="banner-img-container">
                      {bannerCroppedImg && (
                        <img
                          className=""
                          src={bannerCroppedImg}
                          alt="banner"
                        ></img>
                      )}
                    </div>
                  </div>
                  <div className="avatar-container-edit">
                    <Avatar className="edit-avatar" src={avatarCroppedImg} />
                    <div className="banner-img-btn-container">
                      <input
                        type="file"
                        multiple
                        id="avatarInput"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          handleImage(e, 'profile')
                        }}
                      />
                      <label htmlFor="avatarInput">
                        <AddImage type="file" className="icon edit" />
                      </label>
                      {/* {bannerPreviewImg && (
                        <RemoveImage
                        className="icon edit"
                        onClick={removeAllImgData}
                        />
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="edit-profile">
              {updatedProfile.isLoggedInByGoogle && (
                <Chip
                  label="Google SignIn"
                  className="custom-chip"
                  icon={<FcGoogle />}
                />
              )}
            </div>

            <div className="modal-info">
              <EditInput
                text={updatedProfile.name}
                name="name"
                label="Name"
                onChange={handleChange}
              />
              <EditInput
                text={updatedProfile.userName}
                name="userName"
                label="UserName"
                onChange={handleChange}
              />
              <EditInput
                text={updatedProfile.email}
                name="email"
                label="Email"
                onChange={handleChange}
                disabled
              />
              <EditTextArea
                name="bio"
                label="Bio"
                text={updateProfile.bio}
                onChange={handleChange}
              />
              <EditBirthdate
                birthdate={birthdate}
                onChange={handleDateChange}
              />
            </div>
          </div>
        ) : editType === 'banner' ? (
          // ----------------------------------------------------------------BANNER--------------------------------------------------------------------
          <div className="modal">
            <div className="modal-headers">
              <button
                className="btn follow-btn"
                onClick={() => {
                  setEditType(null)
                }}
              >
                done
              </button>
              <div className="modal-title">set banner</div>
              <CgClose
                className="close-notification position-initial"
                onClick={handleCloseModal}
              />
            </div>

            <div className="modal-images">
              <div className="modal-bannerImg">
                <div className="banner">
                  <div>
                    <div className="banner-img-container">
                      {bannerPreviewImg && (
                        <ReactCrop
                          onComplete={(crop) => {
                            onCropComplete(crop, bannerPreviewImg, 'banner')
                          }}
                          crop={defaultBannerCrop}
                          minWidth={100}
                          onChange={(c) => setBannerCrop(c)}
                        >
                          <img
                            className=""
                            src={bannerPreviewImg}
                            alt="profile"
                          />
                        </ReactCrop>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // ---------------------------------------------PROFILE--------------------------------------------
          <div className="modal">
            <div className="modal-headers">
              <button
                className="btn follow-btn"
                onClick={() => {
                  setEditType(null)
                }}
              >
                done
              </button>
              <div className="modal-title">set profile</div>
              <CgClose
                className="close-notification position-initial"
                onClick={handleCloseModal}
              />
            </div>

            <div className="modal-images">
              <div className="modal-bannerImg">
                <div className="banner">
                  <div>
                    <div className="banner-img-container">
                      {avatarImg && (
                        <ReactCrop
                          onComplete={(crop) => {
                            onCropComplete(crop, avatarImg, 'profile')
                          }}
                          circularCrop={true}
                          aspect={1}
                          crop={avatarCrop}
                          className="react-crop"
                          onChange={(c) => setAvatarCrop(c)}
                        >
                          <img
                            className=""
                            src={avatarImg}
                            onLoad={handleImageLoad}
                            alt="avatar img"
                          />
                        </ReactCrop>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default EditModal
