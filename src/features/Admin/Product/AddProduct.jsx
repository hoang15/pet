import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import CategoryApi from "../../../api/CategoryApi";
import imageProductApi from "../../../api/ImageProductApi";
import productApi from "../../../api/productApi";
import tagApi from "../../../api/tagApi";
import tagProductApi from "../../../api/tagProductApi";
import { storage } from "../../../firebase";
import { checkArrayEquar, messageShowErr } from "../../../function";
import Mutil from "../../InforUser/Multi/Mutil";
import Spinner from "../Spin/Spinner";
import { camera } from "../svg/IconSvg";

export default function AddProduct() {
  const { id } = useParams();
  const [state, setState] = useState({
    loadSpin: false,
    linkImg: "",
    nameImg: "",
    img: "",
    imgId: "",
    tagId: "",
    tagDefault: [],
    categoryDefault: "",
    mutilImg: "",
    mutilImgId: "",
    categoryId: "",
  });
  const {
    loadSpin,
    linkImg,
    nameImg,
    tagId,
    tagDefault,
    categoryId,
    categoryDefault,
    mutilImg,
    mutilImgId,
    img,
    imgId,
  } = state;
  const [tags, setTags] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [text, setText] = useState(null);
  const getApiTag = () => {
    tagApi.getAll({ status: 1 }).then((ok) => {
      setTags(ok.data.rows);
    });
  };
  const getApiCategory = () => {
    CategoryApi.getAll({ status: 1 }).then((ok) => {
      setCategorys(ok.data.rows);
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (id) {
      productApi.getOne(id).then((ok) => {
        reset(ok);
        setText(ok.text);
        setState({
          ...state,
          tagDefault: ok.Tags,
          categoryDefault: ok.Category,
          tagId: formatTagDefault(ok.Tags),
          mutilImgId: ok.imgproduct,
          imgId: ok.avatar,
        });
      });
    }
    getApiTag();
    getApiCategory();
  }, []);
  const hangdelimage = (e) => {
    setState({
      ...state,
      linkImg: URL.createObjectURL(e.target.files[0]),
      nameImg: e.target.files[0].name,
      img: e.target.files[0],
    });
  };
  const history = useHistory();
  const onSubmit = async (data) => {
    if (text !== null) {
      setState({ ...state, loadSpin: true });
      if (id) {
        if (img !== "" || mutilImg !== "") {
          if (img !== "" && mutilImg === "") {
            await storage.ref(`imagesProduct/${img.name}`).put(img);
            const anh = await storage
              .ref("imagesProduct")
              .child(img.name)
              .getDownloadURL();
            if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
              await productApi.editproduct({
                name: data.name,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
                text: text,
                categoryId: categoryId === "" ? categoryDefault.id : categoryId,
                avatar: anh,
                id: id,
              });
            } else {
              await tagProductApi.deletetagProduct(id);
              var data1 = [];
              for (let i = 0; i < tagId.length; i++) {
                let tag = tagId[i];
                data1.push({ productId: id, tagId: tag });
              }
              await tagProductApi.posttagProduct(data1);
              await productApi.editproduct({
                name: data.name,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
                text: text,
                categoryId: categoryId === "" ? categoryDefault.id : categoryId,
                avatar: anh,
                id: id,
              });
            }
          } else if (img === "" && mutilImg !== "") {
            var imgproduct = [];
            for (let i = 0; i < mutilImg.length; i++) {
              await storage
                .ref(`imagesProduct/${mutilImg[i].name}`)
                .put(mutilImg[i]);
              var imgs = await storage
                .ref("imagesProduct")
                .child(mutilImg[i].name)
                .getDownloadURL();
              imgproduct.push({ link: imgs });
            }
            await imageProductApi.deleteimageProduct(id);
            var data1 = [];
            for (let i = 0; i < imgproduct.length; i++) {
              let img = imgproduct[i];
              data1.push({ productId: id, link: img });
            }
            await imageProductApi.postimageProduct(data1);
            if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
              await productApi.editproduct({
                name: data.name,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
                text: text,
                categoryId: categoryId === "" ? categoryDefault.id : categoryId,
                id: id,
              });
            } else {
              await tagProductApi.deletetagProduct(id);
              var data1 = [];
              for (let i = 0; i < tagId.length; i++) {
                let tag = tagId[i];
                data1.push({ productId: id, tagId: tag });
              }
              await tagProductApi.posttagProduct(data1);
              await productApi.editproduct({
                name: data.name,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
                text: text,
                categoryId: categoryId === "" ? categoryDefault.id : categoryId,
                id: id,
              });
            }
          } else {
            var imgproduct = [];
            for (let i = 0; i < mutilImg.length; i++) {
              await storage
                .ref(`imagesProduct/${mutilImg[i].name}`)
                .put(mutilImg[i]);
              var imgs = await storage
                .ref("imagesProduct")
                .child(mutilImg[i].name)
                .getDownloadURL();
              imgproduct.push({ link: imgs });
            }
            await imageProductApi.deleteimageProduct(id);
            var data1 = [];
            for (let i = 0; i < imgproduct.length; i++) {
              let img = imgproduct[i];
              data1.push({ productId: id, link: img });
            }
            await imageProductApi.postimageProduct(data1);
            await storage.ref(`imagesProduct/${img.name}`).put(img);
            const anh = await storage
              .ref("imagesProduct")
              .child(img.name)
              .getDownloadURL();
            if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
              await productApi.editproduct({
                name: data.name,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
                text: text,
                categoryId: categoryId === "" ? categoryDefault.id : categoryId,
                avatar: anh,
                id: id,
              });
            } else {
              await tagProductApi.deletetagProduct(id);
              var data1 = [];
              for (let i = 0; i < tagId.length; i++) {
                let tag = tagId[i];
                data1.push({ productId: id, tagId: tag });
              }
              await tagProductApi.posttagProduct(data1);
              await productApi.editproduct({
                name: data.name,
                price: data.price,
                description: data.description,
                quantity: data.quantity,
                text: text,
                categoryId: categoryId === "" ? categoryDefault.id : categoryId,
                avatar: anh,
                id: id,
              });
            }
          }
        } else {
          if (checkArrayEquar(formatTagDefault(tagDefault), tagId)) {
            await productApi.editproduct({
              name: data.name,
              price: data.price,
              description: data.description,
              quantity: data.quantity,
              text: text,
              categoryId: categoryId === "" ? categoryDefault.id : categoryId,
              id: id,
            });
          } else {
            await tagProductApi.deletetagProduct(id);
            var data1 = [];
            for (let i = 0; i < tagId.length; i++) {
              let tag = tagId[i];
              data1.push({ productId: id, tagId: tag });
            }
            await tagProductApi.posttagProduct(data1);
            await productApi.editproduct({
              name: data.name,
              price: data.price,
              description: data.description,
              quantity: data.quantity,
              text: text,
              categoryId: categoryId === "" ? categoryDefault.id : categoryId,
              id: id,
            });
          }
        }
      } else {
        await storage.ref(`imagesProduct/${img.name}`).put(img);
        const anh = await storage
          .ref("imagesProduct")
          .child(img.name)
          .getDownloadURL();
        var tagproduct = [];
        for (let i = 0; i < tagId.length; i++) {
          tagproduct.push({ tagId: tagId[i] });
        }
        var imgproduct = [];
        for (let i = 0; i < mutilImg.length; i++) {
          await storage
            .ref(`imagesProduct/${mutilImg[i].name}`)
            .put(mutilImg[i]);
          var imgs = await storage
            .ref("imagesProduct")
            .child(mutilImg[i].name)
            .getDownloadURL();
          imgproduct.push({ link: imgs });
        }
        await productApi.postproduct({
          name: data.name,
          price: data.price,
          description: data.description,
          quantity: data.quantity,
          text: text,
          avatar: anh,
          categoryId,
          tagproduct,
          imgproduct,
          status: 0,
        });
      }
      history.push("/Admin/Product");
    } else {
      messageShowErr("Not enough information!");
    }
  };
  const hangdleMutilImg = (e) => {
    setState({ ...state, mutilImg: e });
  };
  const formatTagDefault = (e) => {
    var arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push(e[i].id);
    }
    return arr;
  };
  const formatDataTag = (e) => {
    var arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push({ value: e[i].id, label: e[i].name });
    }
    return arr;
  };
  const formatDataCategory = (e) => {
    return [{ value: e.id, label: e.name }];
  };
  const onchangeTag = (e) => {
    let arr = [];
    for (let i = 0; i < e.length; i++) {
      arr.push(e[i].value);
    }
    setState({ ...state, tagId: arr });
  };
  const onchangeCategory = (e) => {
    setState({ ...state, categoryId: e.value });
  };
  return (
    <div className="CreateAdmin">
      <div className="heading">
        <div className="heading__title">
          <h3>{!id ? "Thêm sản phẩm" : "Sửa sản phẩm"}</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-admin">
          <label htmlFor="">Product's name</label>
          <input
            type="text"
            {...register("name", {
              required: "Not be empty!",
              maxLength: {
                value: 255,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Avatar</label>
          <div className="update">
            <div className="icon-avatar">
              <label htmlFor="avatar">{camera}</label>
              <input
                type="file"
                name=""
                id="avatar"
                hidden
                onChange={hangdelimage}
              />
            </div>
            {linkImg ? (
              <img
                src={linkImg}
                className="img-update"
                height="150px"
                width="250px"
                alt=""
              />
            ) : imgId ? (
              <img
                src={imgId}
                className="img-update"
                height="150px"
                width="250px"
                alt=""
              />
            ) : (
              ""
            )}
            <br />
            <span>{nameImg}</span>
          </div>
        </div>
        <div className="input-admin">
          <label htmlFor="">Related photos</label>
          <Mutil mutilImg={hangdleMutilImg} />
          {mutilImg === "" ? (
            <div className="mutil">
              <div className="result">
                {mutilImgId.length === 0
                  ? ""
                  : mutilImgId?.map((ok) => <img src={ok.link} alt="" />)}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* <div className="input-admin">
          <label htmlFor="">Tag</label>
          {tags.length === 0 ? (
            <Spinner />
          ) : (
            <Select
              closeMenuOnSelect={false}
              placeholder="Chọn các tag liên quan"
              defaultValue={formatDataTag(tagDefault)}
              isMulti
              onChange={onchangeTag}
              options={formatDataTag(tags)}
            />
          )}
        </div> */}
        <div className="input-admin">
          <label htmlFor="">Product portfolio</label>
          {categorys.length === 0 ? (
            <Spinner />
          ) : (
            <Select
              closeMenuOnSelect={false}
              placeholder="Select product category"
              defaultValue={formatDataCategory(categoryDefault)}
              onChange={onchangeCategory}
              options={formatDataTag(categorys)}
            />
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Giá</label>
          <input
            type="number"
            {...register("price", {
              required: "Not be empty!",
              maxLength: {
                value: 255,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Amount</label>
          <input
            type="number"
            {...register("quantity", {
              required: "Not be empty!",
              maxLength: {
                value: 255,
                message: "Exceeded characters allowed!",
              },
            })}
          />
          {errors.quantity && (
            <span className="text-danger">{errors.quantity.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Describe</label>
          <textarea
            name=""
            id=""
            rows="5"
            {...register("description", {
              required: "Not be empty!",
              maxLength: {
                value: 1000,
                message: "Exceeded characters allowed!",
              },
            })}
          ></textarea>

          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </div>
        <div className="input-admin">
          <label htmlFor="">Highlights</label>
          <JoditEditor value={text} tabIndex={1} onChange={(e) => setText(e)} />
        </div>
        <div className="btn_submit">
          {loadSpin ? (
            <Spinner />
          ) : id ? (
            <input type="submit" value="Sửa sản phẩm" />
          ) : (
            <input type="submit" value="Thêm mới" />
          )}
        </div>
      </form>
    </div>
  );
}
