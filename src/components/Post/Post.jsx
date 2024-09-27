import Container from "../container/Container";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import RTE from "../RTE";
import Select from "../Select";
import Button from "../Button";
import storageService from "../../appwrite/Storage";
import databaseService from "../../appwrite/Database";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../loading/LoadingSpinner";
function Post({ post }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  let userData1;
  const userData = useSelector(state => state.auth.userData)
  // check post  came from where
  const { register, control, handleSubmit, setValue, getValues, watch, reset } =
    useForm({
      defaultValues: {
        title: post?.Title || " ",
        slug: post?.Slug || " ",
        content: post?.Content || " ",
        status: post?.Status || " ",
      },
    });

  React.useEffect(() => {
    let data = localStorage.getItem("userData");
    userData1 = JSON.parse(data);
    if (post) {
      reset({
        title: post.Title || "",
        slug: post.Slug || "",
        content: post.Content || "",
        status: post.Status || "",
        image: undefined, // Clear image input if necessary
      });
      console.log("Form state after reset:", watch()); // Log form state
    }
  }, [post, reset, watch]);
  // usenavigate

  // might be error in userDATA
  const submit = async (data) => {
    setLoading(true);
    if (data.content === undefined || data.content.trim() === "") {
      console.log("Content is empty or undefined");
    }

    if (post) {
      const file = data.image[0]
        ? await storageService.fileUpload(data.image[0])
        : null;
      if (file) {
        await storageService.deleteFile(post.FeaturedImage);
      }
      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) {
        setLoading(false);
        navigate("/all-posts");
      }
    } else {
      setLoading(true);
      try {
        if (!userData) {
          console.log("User data not found");
          return;
        }

        const file = await storageService.fileUpload(data.image[0]);
        if (!file) {
          console.error("File upload failed or no file provided.");
          return; // Prevent further execution if file upload fails
        }
        if (file) {
          console.log("File uploaded successfully:", file);
          const fileId = file.$id;
          data.FeaturedImage = fileId;
         
          
          const dbPost = await databaseService.createPost({
            ...data,
            featuredImage: data.FeaturedImage,
            userId: userData? userData.$id : userData1.$id,
          });
          console.log("Creating post with data:", {
            ...data,
            featuredImage: fileId,
            userId: userData.$id,
          });
          // if(dbPost){
          //     navigate(`/post/${dbPost.$id}`)
          // }
          if (!fileId) {
            console.error("Image is required for new posts");
            return;
          }
          if (dbPost) {
            setLoading(false);
            navigate("/all-posts");
          }
        } else {
          console.log("error file upload");
        }
      } catch (e) {
        console.error("Error during file upload:", e.message);
      }
      console.log(data.FeaturedImage);
    }
  };
  const slugTransformtion = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");

    return "";
  }, []);
  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransformtion(value.title), {
          shouldValidate: true,
        });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue, slugTransformtion]);

  if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <div className="w-full max-w-screen-2xl pb-10">
      <Container>
        <div className="card w-full lg:w-4/5 mx-auto rounded-xl max-w-screen-2xl pt-16 px-6 pb-10 bg-[#e5e5e5] mt-10 mb-10 ">
          <h1 className=" text-center text-[1.9rem] leading-[1.8rem] md:text-[3.4rem] md:leading-[3.4rem] text-[#646464]  tracking-wider font-Founders font-extrabold">
            WELCOME TO MYBLOG
          </h1>
          <h2 className=" text-[1rem] md:text-[1.5rem]   font-Neue text-center ">
            {post ? "Update" : "Create"}
            Your Post
          </h2>

          <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-wrap mt-10 flex-col justify-center lg:flex-row lg:justify-start  gap-4  lg:gap-0"
          >
            <div className="left w-full lg:w-2/3 px-2 flex flex-col gap-4 ">
              <Input
                label="Title:"
                type="text"
                placeholder="Enter your Title"
                className="mb-4"
                {...register("title", {
                  required: true,
                })}
              />

              <Input
                label="Slug:"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {
                  required: true,
                })}
                onInput={(e) => {
                  setValue("slug", slugTransformtion(e.currentTarget.value), {
                    shouldValidate: true,
                  });
                }}
              />
              <RTE
                label="Content:"
                name="content"
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
            <div className=" right  w-full lg:w-1/3 flex flex-col gap-4 px-2 ">
              <Input
                className="w-full bg-white rounded-lg"
                label="Featured Image:"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", {
                  required: !post,
                })}
              />

              {post && (
                <div className="w-full ">
                  <img
                    src={storageService.getFilePreview(post.FeaturedImage)}
                    alt={post.title}
                    className="rounded-lg"
                  />
                </div>
              )}

              {/* image preview pending */}
              <Select
                className="w-full"
                label="Status"
                options={["active ", "inactive"]}
                {...register("status", {
                  required: true,
                })}
              />
              <Button
                type="Submit"
                backgroundColor=""
                className="w-full text-white"
                // verification for name
              >
                {post ? "Update" : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Post;
