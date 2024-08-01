import React from "react"
import { useLocation } from "react-router-dom"
import PrevPageButton from "../../../components/PrevPageButton"
import { apiPath } from "../../../services/httpService"
import { useState } from "react"
import { addProductImage, deleteProductImageService, setMainProductImageService } from "../../../services/products"
import { Alert, Confirm } from "../../../utils/alerts"
import SpinnerLoad from "../../../components/SpinnerLoad"
const ProductGallery = () => {
    const location = useLocation()
    const { selectedProduct } = location.state
    const [gallery, setGallery] = useState(selectedProduct.gallery)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSelectImage = async (e) => {
        setError(null)

        const image = e.target.files[0]
        const formdata = new FormData()
        formdata.append("image", image)
        if (image.type != "image/png" && image.type != "image/jpeg" && image.type != "image/jpg")
            return setError("Please only use jpg or png format")
        if (image.size > 512000) return setError("Image size should not be more than 500 KB")
        setLoading(true)
        const res = await addProductImage(selectedProduct.id, formdata)
        setLoading(false)
        if (res.status === 201) {
            Alert('Done', res.data.message, 'success')
            setGallery(old => [...old, { id: res.data.data.id, is_main: 0, image: res.data.data.image }])
        }
    }

    const handleDeleteImage = async (imageId)=>{
        if (await Confirm("Are you sure you want to delete this image?")) {
            setLoading(true)
            const res = await deleteProductImageService(imageId)
            setLoading(false)
            if (res.status === 200) {
                Alert('Done' , res.data.message, 'success')
                setGallery(old=>old.filter(image=>image.id != imageId))
            }
        }
    }

    const handleSetMainImage = async (imageId)=>{
        setLoading(true)
        const res = await setMainProductImageService(imageId)
        setLoading(false)
        if (res.status === 200) {
            Alert('Done' , res.data.message, 'success')
            setGallery(old=>{
                let newGallery=  old.map(img=>{return{...img, is_main : 0}})     
                const index = newGallery.findIndex(i=>i.id == imageId)
                newGallery[index].is_main = 1
                return newGallery           
            })
        }
    }

    return (
        <div className="container">
            <h4 className="text-center my-3"> Image gallery management: <span className="text-primary">{selectedProduct.title}</span> </h4>
            <div className="text-left m-auto my-3">
                <PrevPageButton />
            </div>

            <div className="row justify-content-center">
                {error ? (
                    <small className="d-d-block text-right text-danger py-3">{error}</small>
                ) : null
                }
                <div className="text-right d-flex flex-wrap">
                    {gallery.length > 0 ?
                        gallery.map(g => (
                            <div key={g.id} className={`rounded border bg-white shadow-sm ms-1 image_gallery d-flex justify-content-center align-items-center pos-relative my-1 ${g.is_main ? "main_image" : ""}`} title={g.is_main ? "Main picture" : ""} >
                                <img src={apiPath + "/" + g.image} className="bg-white  ms-1 w-100" />
                                <div className="image_action_container">
                                    {!g.is_main ? (
                                        <i className="fas fa-clipboard-check text-success pointer hoverable_text mx-2 font_1_2" title="Select as main" onClick={()=>handleSetMainImage(g.id)}> </i>
                                    ) : null}
                                    <i className="fas fa-trash-alt text-danger pointer hoverable_text mx-2 font_1_2" title="Delete this image"  onClick={()=>handleDeleteImage(g.id)}></i>
                                </div>
                            </div>
                        )) : null
                    }

                    <div className={`rounded border bg-white shadow-sm ms-1 hoverable add_image_gallery d-flex justify-content-center align-items-center pos-relative my-1 ${loading ? "disabled" : ""}`} title="Add New Image">
                        {
                            loading ? (
                                <SpinnerLoad />
                            ) : (
                                <i className="fas fa-plus fa-2x text-success border p-3 rounded-circle"></i>
                            )
                        }
                        <input type="file" name="image" className="w-100 h-100 opacity_0 pos-absolute pointer"
                            onChange={handleSelectImage} />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProductGallery