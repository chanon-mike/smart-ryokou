import type { Location } from '@/types/recommendation';
import { Edit, Delete } from '@mui/icons-material';
import { Card, Grid, CardMedia, CardContent, Typography, IconButton, styled } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const HoverableCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[2],
    borderColor: theme.palette.primary.main,
  },
}));

const SecondaryColorHoverIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
  },
}));

type SortableLocationCardProps = {
  location: Location;
  disabled?: boolean;
};

const SortableLocationCard = ({ location, disabled = false }: SortableLocationCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: location.name,
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
            minHeight: '100px',
            margin: '10px 0px',
            cursor: `${disabled ? 'pointer' : 'grab'}`,
          }}
        >
          <Grid container>
            <Grid item xs={4}>
              <CardMedia
                component="img"
                height="100px"
                width="100px"
                image={location.imageUrl}
                alt="Image"
              />
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Typography variant="h6" component="div">
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
              sx={{ display: 'flex', justifyContent: 'space-evenly', flexDirection: 'column' }}
            >
              <SecondaryColorHoverIconButton aria-label="Edit">
                <Edit />
              </SecondaryColorHoverIconButton>
              <SecondaryColorHoverIconButton aria-label="Delete">
                <Delete />
              </SecondaryColorHoverIconButton>
            </Grid>
          </Grid>
        </HoverableCard>
      </div>
    </div>
  );
};

export default SortableLocationCard;
