import Home from '@/modules/Recommended';
import Auth from '@/modules/Auth';
import ErrorScreen from '@/modules/Auth/Error';
import Proceed from '@/modules/Auth/Proceed';
import NotFound from '@/modules/NotFound';
import CollectingScreen from '@/modules/Auth/BuildProfile';
import SetupComplete from '@/modules/Auth/SetupComplete';
import Profile from '@/modules/Profile';
import PostCreation from '@/containers/PostCreation';
import AdCreation from '@/containers/AdCreation';
import Ads from '@/containers/Ads';
import LoginRedirect from '@/modules/LoginRedirect';
import Install from '@/modules/Install';
import Saved from '@/containers/Saved';
import Audience from '@/containers/Audience';

export default [
  {
    path: '/',
    exact: true,
    pageTitle: 'Recommended',
    component: Home
  },
  {
    path: '/auth',
    exact: true,
    pageTitle: 'Welcome',
    component: Auth
  },
  {
    path: '/auth/error',
    pageTitle: '',
    component: ErrorScreen
  },
  {
    path: '/auth/proceed',
    pageTitle: '',
    component: Proceed
  },
  {
    path: '/auth/build-profile',
    pageTitle: 'Building Profile',
    component: CollectingScreen
  },
  {
    path: '/auth/lets-go',
    pageTitle: 'Setup Complete',
    component: SetupComplete

  },
  {
    path: '/profile',
    pageTitle: '',
    component: Profile
  },
  {
    path: '/saved',
    exact: true,
    pageTitle: 'Saved Content',
    component: Saved
  },
  {
    path: '/saved/new',
    pageTitle: '',
    component: PostCreation
  },
  {
    path: '/ads',
    exact: true,
    pageTitle: 'My Ads',
    component: Ads
  },
  {
    path: '/ads/new',
    pageTitle: '',
    component: AdCreation
  },
  {
    path: '/ads/audience',
    pageTitle: 'Audience',
    component: Audience
  },
  {
    path: '/auth/facebookRedirect',
    exact: true,
    pageTitle: '',
    component: LoginRedirect
  },
  {
    path: '/install',
    pageTitle: 'Install our app',
    component: Install
  },
  {
    path: '*',
    pageTitle: 'Page Unavailable',
    component: NotFound
  },
];
