import "../scss/base/reset.scss";
import "../scss/base/root.scss";
import "../scss/app.scss";
import "../scss/components/first-section.scss";
import "../scss/components/second-section.scss";
import "../scss/components/third-section.scss";
import "../scss/components/fourth-section.scss";
import "../scss/components/fifth-section.scss";
import "../scss/components/sixth-section.scss";
import {PAGE} from './LoadPage';
import {Family_Gathering} from './Family-Gathering';
import {Special_Events} from './Special-Events';
import {Social_Events} from './Social-Events';

PAGE.RenderFirstSection();
Family_Gathering.SetAddEventListeners();
Special_Events.SetAddEventListeners();
Social_Events.SetAddEventListeners();





