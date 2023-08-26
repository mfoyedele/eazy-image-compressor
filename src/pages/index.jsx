import { userService } from 'services';
import { Link } from 'components';

export default Home;

function Home() {
    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>Welcome!</p>
                <p><Link legacyBehavior href="/users">Manage Users</Link></p>
                <p>Image Compressor</p>
            
            <div id="container">
      <h3>Image Compressor</h3>
      <input id="imgId" type="file" accept="image/*"/>
  </div>
            </div>
        </div>
    );
}
