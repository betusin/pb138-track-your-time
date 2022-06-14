import { DeleteButton } from "./DeleteButton";
import ImageGallery from "react-image-gallery";
import { useRef } from "react";
import { GetSessionPhotoDto } from "../../api/model";
import { Box } from "@mui/material";

export interface DesktopImageGalleryProps {
  photos: GetSessionPhotoDto[];
  onDelete: (id: string) => void;
}

export function DesktopImageGallery({
  photos,
  onDelete,
}: DesktopImageGalleryProps) {
  const idxRef = useRef<ImageGallery>(null);
  const images = photos.map((photo) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { original: photo.contents, thumbnail: photo.contents };
  });
  return (
    <ImageGallery
      items={images}
      slideInterval={5000}
      showThumbnails={true}
      showNav={true}
      showIndex={true}
      thumbnailPosition={"left"}
      ref={idxRef}
      renderCustomControls={() => (
        <Box display="flex" justifyContent="center">
          <DeleteButton
            id=""
            onDelete={() => {
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              onDelete(photos[idxRef!.current!.getCurrentIndex()].id);
            }}
            border={true}
          />
        </Box>
      )}
    />
  );
}
