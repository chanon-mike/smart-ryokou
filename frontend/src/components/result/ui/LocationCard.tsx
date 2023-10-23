import type { Location } from '@/types/recommendation';
import { Edit, Delete, Description } from '@mui/icons-material';
import { Card, Grid, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  step: Location;
};

const LocationCard = ({ step }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: step.name,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div id={step.name}>
        <Card
          style={{
            padding: '10px 20px',
            borderRadius: '16px',
            border: '2px solid',
            cursor: 'grab',
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
        </Card>
      </div>
    </div>
  );
};

export default LocationCard;
