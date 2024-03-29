import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';

import DeleteLocationButton from '@/components/recommendation/list/location-card/DeleteLocationButton';
import FindRestaurantButton from '@/components/recommendation/list/location-card/FindRestaurantButton';
import type { Location } from '@/types/recommendation';

const HoverableCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  transition: 'transform 0.3s',
  '&:hover': {
    boxShadow: theme.shadows[2],
    borderColor: theme.palette.primary.main,
  },
}));

type SortableLocationCardProps = {
  location: Location;
  disabled?: boolean;
  onSelect: (index: number) => void;
  onConfirmDelete: (placeName: string) => void;
  onFindRestaurant?: (recIndex: number, dateIndex: number, location: Location) => void;
  index: number; // date index
  recIndex?: number;
};

const SortableLocationCard = ({
  location,
  disabled = false,
  onSelect,
  index,
  recIndex,
  onConfirmDelete,
  onFindRestaurant,
}: SortableLocationCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: location.id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div id={location.name}>
        <HoverableCard
          variant="outlined"
          style={{
            padding: 0,
            height: '100px',
            margin: '10px 0px',
            cursor: `${disabled ? 'pointer' : 'grab'}`,
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                height={'100%'}
                width={'100%'}
                image={location.photo}
                alt="Image"
                onMouseDown={() => onSelect(index)}
              />
            </Grid>
            <Grid item xs={7}>
              <CardContent onMouseDown={() => onSelect(index)}>
                <Typography variant="h6" noWrap>
                  {location.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {location.description}
                </Typography>
              </CardContent>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* TODO: Make edit button for each location memo instead of edit */}
              {/* <SecondaryColorHoverIconButton aria-label="Edit">
                <Edit />
              </SecondaryColorHoverIconButton> */}
              <FindRestaurantButton
                onFindRestaurant={onFindRestaurant}
                recIndex={recIndex ?? 0}
                dateIndex={index ?? 0}
                location={location}
              />
              <DeleteLocationButton onConfirmDelete={onConfirmDelete} locationId={location.id} />
            </Grid>
          </Grid>
        </HoverableCard>
      </div>
    </div>
  );
};

export default SortableLocationCard;
