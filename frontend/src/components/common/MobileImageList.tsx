import { GetSessionPhotoDto } from "../../api/model";
import { DeleteButton } from "./DeleteButton";

export interface MobileImageListProps {
  photos: GetSessionPhotoDto[];
  onDelete: (id: string) => void;
}

export function MobileImageList({ photos, onDelete }: MobileImageListProps) {
  return (
    <div>
      {photos.map((photo) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const contents = photo.contents;
        return (
          <div key={photo.id} className="session-photo">
            <img className="session-photo--image" src={contents} />
            <div className="session-photo-bar">
              <DeleteButton onDelete={onDelete} id={photo.id} border />
            </div>
          </div>
        );
      })}
    </div>
  );
}
