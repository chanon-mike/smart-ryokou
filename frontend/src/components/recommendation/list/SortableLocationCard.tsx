import type { Location } from '@/types/recommendation';
import { Edit, Delete, Description } from '@mui/icons-material';
import { Card, Grid, CardMedia, CardContent, Typography, IconButton, styled } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const HoverableCard = styled(Card)(({ theme }) => ({
  padding: '10px 20px',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[2],
  },
}));

type SortableLocationCardProps = {
  step: Location;
  disabled?: boolean;
};

const SortableLocationCard = ({ step, disabled = false }: SortableLocationCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: step.name,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div id={step.name}>
        <HoverableCard
          variant="outlined"
          style={{
            padding: '10px 20px',
            cursor: `${disabled ? 'default' : 'grab'}`,
          }}
        >
          <Grid container>
            <Grid
              item
              xs={4}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CardMedia
                component="img"
                height="100px"
                width="100px"
                image={step.imageUrl}
                alt="Image"
              />
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {step.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" noWrap>
                  {step.description}
                </Typography>
              </CardContent>
            </Grid>
            <Grid item xs={1}>
              <IconButton aria-label="Edit">
                <Edit />
              </IconButton>
              <IconButton aria-label="Delete">
                <Delete />
              </IconButton>
              <IconButton aria-label="Description">
                <Description />
              </IconButton>
            </Grid>
          </Grid>
        </HoverableCard>
      </div>
    </div>
  );
};

export default SortableLocationCard;
