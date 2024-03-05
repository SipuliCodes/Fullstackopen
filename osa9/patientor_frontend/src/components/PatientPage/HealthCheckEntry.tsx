import { HealthCheckEntry } from "../../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

interface Props {
  entry: HealthCheckEntry
}

const HealthCheck = ({ entry }: Props) => {
  
  return (
    <div className="EntryBox">
      {entry.date} <MedicalServicesIcon />
      <br></br>
      {entry.description}
      <br></br>
      {entry.healthCheckRating === 0 ? <FavoriteIcon style={{ color: 'green' }} /> : entry.healthCheckRating === 1 ? <FavoriteIcon style={{ color: 'yellow' }} /> : entry.healthCheckRating === 2 ? <FavoriteIcon style={{ color: 'red' }} /> : <HeartBrokenIcon style={{ color: 'red' }} />}
      <br></br>
      diagnose by {entry.specialist}
    </div>
  );
};

export default HealthCheck;