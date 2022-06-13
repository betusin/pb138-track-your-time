import { GetSessionWithPhotosDto } from "../../api/model";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useWindowSize } from "../../util/window-size-hook";
import { NoDataMessage } from "../common/NoDataMessage";

export interface SessionPhotoSectionProps {
  session: GetSessionWithPhotosDto;
}

const galleryBreakpoint = 600;

export function SessionPhotoSection({ session }: SessionPhotoSectionProps) {
  const { width } = useWindowSize();
  const images = session.photos.map((photo) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { original: photo.contents, thumbnail: photo.contents };
  });
  const gallery = (
    <ImageGallery
      items={images}
      slideInterval={5000}
      showThumbnails={true}
      showNav={true}
      showIndex={true}
      thumbnailPosition={"left"}
    />
  );
  const list = (
    <div>
      {session.photos.map((photo) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const contents = photo.contents;
        return <img key={photo.id} className="session-photo" src={contents} />;
      })}
    </div>
  );
  return (
    <div>
      {images.length > 0 ? (
        (width ?? 1024) > galleryBreakpoint ? (
          gallery
        ) : (
          list
        )
      ) : (
        <NoDataMessage />
      )}
    </div>
  );
}
