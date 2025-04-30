import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// Extend the Window interface to include Pusher (if necessary)
declare global {
    interface Window {
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

// Create an instance of Echo
const echo = new Echo({
    broadcaster: 'pusher',
    key: '378e435f4e6d629b8c6d', // Replace with your Pusher app key
    cluster: 'ap2',             // Replace with your Pusher cluster
    forceTLS: true,
});

export default echo;
