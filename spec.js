/* eslint-env mocha */
/* eslint-disable no-unused-vars */

/** IGNORE ALL OF THIS **/
/** IGNORE ALL OF THIS **/
/** IGNORE ALL OF THIS **/
/** IGNORE ALL OF THIS **/
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
  includeNodeLocations: true,
  runScripts: 'dangerously',
});
const { window } = dom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function(id) {
  clearTimeout(id);
};

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

copyProps(window, global);

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import spies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  Switch,
  Redirect,
  Route,
  MemoryRouter,
  Link,
  NavLink,
} from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(spies);

import React from 'react';
import { expect, assert } from 'chai';
import { mount, shallow } from 'enzyme';

/* START HERE */
/* START HERE */
/* START HERE */
/* START HERE */

/**************************/
/* PART ONE: The Company Component */
/**************************/

const Company = () => {
  return null;
};

xdescribe('The <Company /> Component', () => {
  describe('Rendering', () => {
    describe('when prop name is The Acme Company', () => {
      it('renders the name of the company in an div tag with an id of company', () => {
        const wrapper = shallow(<Company name="The Acme Company" />);
        const companyDiv = wrapper.find('div#company');

        expect(companyDiv).to.have.length(
          1,
          'Expected to find company name div',
        );
        expect(companyDiv.text()).to.equal('The Acme Company');
      });
    });
    describe('when prop name is The FooBarBazz Company', () => {
      it('renders the name of the company in an div tag with an id of title', () => {
        const wrapper = shallow(<Company name="The FooBarBazz Company" />);
        const companyDiv = wrapper.find('div#company');

        expect(companyDiv).to.have.length(
          1,
          'Expected to find company name div',
        );
        expect(companyDiv.text()).to.equal('The FooBarBazz Company');
      });
    });
  });
});

/**************************/
/* PART TWO: The  Notice Component */
/**************************/

const Notice = () => {
  return null;
};

xdescribe('<Notice />', () => {
  describe('Rendering the text props', () => {
    it('renders text in a div in all caps', () => {
      let wrapper = shallow(<Notice text="Look Out" />);
      let div = wrapper.find('div');

      expect(div).to.have.length(1, 'Expected to find one div element');
      expect(div.text()).to.equal('LOOK OUT');

      wrapper = shallow(<Notice text="Watch It" />);
      div = wrapper.find('div');

      expect(div).to.have.length(1, 'Expected to find one div element');
      expect(div.text()).to.equal('WATCH IT');
    });
  });
  describe('When critical props is set to true', () => {
    it('sets the class name to red', () => {
      let wrapper = shallow(<Notice text="Look Out" critical={true} />);
      let div = wrapper.find('div.red');

      expect(div).to.have.length(1, 'Expected to find one div element');
      expect(div.text()).to.equal('LOOK OUT');

      wrapper = shallow(<Notice text="Watch It" />);
      div = wrapper.find('div.red');

      expect(div).to.have.length(0, 'Expected not to find div with class red');
    });
  });
});

/**************************/
/* PART THREE: The Preview Component */
/**************************/
class Preview extends React.Component {
  render() {
    return null;
  }
}

xdescribe('<Preview />', () => {
  describe('state', () => {
    it('sets state with passed in props and renders component correctly', () => {
      let wrapper = shallow(
        <Preview content="Hello World" charCount={2} isPreview={true} />,
      );
      expect(wrapper.state()).to.eql(
        { content: 'Hello World', charCount: 2, isPreview: true },
        'expected state to contain passed in props',
      );
      expect(wrapper.find('p').text()).to.equal('He');

      wrapper = shallow(
        <Preview content="Hello World!!!!" charCount={3} isPreview={false} />,
      );
      expect(wrapper.state()).to.eql(
        { content: 'Hello World!!!!', charCount: 3, isPreview: false },
        'expected state to contain passed in props',
      );
    });
  });

  describe('interaction', () => {
    it('clicking the p sets toggles isPreview', () => {
      const wrapper = shallow(
        <Preview content="Hello World" charCount={2} isPreview={true} />,
      );

      wrapper.find('p').simulate('click');
      expect(wrapper.state().isPreview).to.equal(false);
      expect(wrapper.find('p').text()).to.equal('Hello World');

      wrapper.find('p').simulate('click');
      expect(wrapper.state().isPreview).to.equal(true);
      expect(wrapper.find('p').text()).to.equal('He');
    });
  });
});

/**************************/
/* PART FOUR: The Things Component */
/**************************/

const Things = ({ things }) => {
  return null;
};

xdescribe('The Things List', () => {
  describe('With three things', () => {
    it('displays the three things names in an unordered list', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR' },
        { id: 3, name: 'BAZZ' },
      ];
      const wrapper = shallow(<Things things={things} />);
      const ul = wrapper.find('ul');
      expect(ul).to.have.length(1, 'Expected to find UL');
      const lis = wrapper.find('li');
      expect(lis).to.have.length(3, "Expected to 3 LI's");

      expect(lis.first().text()).to.equal('FOO');
      expect(lis.last().text()).to.equal('BAZZ');

      expect(lis.first().key()).to.equal('1');
      expect(lis.last().key()).to.equal('3');
    });

    it('special thing gets a special class', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR', special: true },
        { id: 3, name: 'BAZZ' },
      ];
      const wrapper = shallow(<Things things={things} />);
      const special = wrapper.find('li.special');
      expect(special.length).to.equal(1);
      expect(special.text()).to.equal('BAR');
    });
  });
});

/**************************/
/* PART FIVE: The StatefulThings Component */
/**************************/

class StatefulThings extends React.Component {
  render() {
    return null;
  }
}

xdescribe('StatefulList', () => {
  describe('With three items', () => {
    it('displays the three things names in an unordered list', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR' },
        { id: 3, name: 'BAZZ' },
      ];
      const wrapper = shallow(<StatefulThings things={things} />);
      const ul = wrapper.find('ul');
      expect(ul).to.have.length(1, 'Expected to find UL');
      const lis = wrapper.find('li');
      expect(lis).to.have.length(3, "Expected to 3 LI's");

      expect(lis.first().text()).to.equal('FOO');
      expect(lis.last().text()).to.equal('BAZZ');

      expect(lis.first().key()).to.equal('1');
      expect(lis.last().key()).to.equal('3');
    });
  });
  describe('Interaction', () => {
    it('clicking on thing toggles its special property', () => {
      const things = [
        { id: 1, name: 'FOO' },
        { id: 2, name: 'BAR' },
        { id: 3, name: 'BAZZ' },
      ];
      const wrapper = shallow(<StatefulThings things={things} />);
      const ul = wrapper.find('ul');
      let lis = wrapper.find('li.special');
      expect(lis.length).to.equal(0);

      wrapper
        .find('li')
        .last()
        .simulate('click');
      expect(wrapper.state().things[2].special).to.equal(true);
      lis = wrapper.find('li.special');
      expect(lis.length).to.equal(1);

      wrapper
        .find('li')
        .last()
        .simulate('click');
      expect(wrapper.state().things[2].special).to.equal(false);
    });
  });
});

/**************************/
/* PART SIX: Acme Routes */
/**************************/

const Places = () => <div>Places</div>;
const Place = () => <div>Place</div>;
const Home = () => <div>Home</div>;
const NotFound = () => <div>NotFound</div>;

const Routes = () => {
  return null;
};

xdescribe('<Routes> component', () => {
  it('renders Home with / path', () => {
    const mounted = mount(
      <MemoryRouter initialEntries={['/']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(mounted.find(Home)).to.have.length(
      1,
      'Expected Home to be rendered',
    );
  });
  it('renders Places with /places path', () => {
    const mounted = mount(
      <MemoryRouter initialEntries={['/places']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(mounted.find(Places)).to.have.length(
      1,
      'Expected Places to be rendered',
    );
    expect(mounted.find(Home)).to.have.length(0, 'should not be rendered');
    expect(mounted.find(NotFound)).to.have.length(0, 'should not be rendered');
    expect(mounted.find(Place)).to.have.length(0, 'should not be rendered');
  });

  it('renders Place with /places/1234', () => {
    const mounted = mount(
      <MemoryRouter initialEntries={['/places/1234']}>
        <Routes />
      </MemoryRouter>,
    );
    expect(mounted.find(Place)).to.have.length(1, 'Place should be rendered');
    expect(mounted.find(Places)).to.have.length(0, 'should not to be rendered');
    expect(mounted.find(Home)).to.have.length(0, 'should not be rendered');
    expect(mounted.find(NotFound)).to.have.length(0, 'should not be rendered');

    expect(mounted.find(Place).props().match.params.id).to.equal('1234');
  });

  it('renders Not Found if no matches', () => {
    const mounted = mount(
      <MemoryRouter initialEntries={['/nothingToSeeHere']}>
        <Routes />
      </MemoryRouter>,
    );

    expect(mounted.find(NotFound)).to.have.length(
      1,
      'Expected NotFound to be rendered',
    );
    expect(mounted.find(Home)).to.have.length(0, 'should not be rendered');
    expect(mounted.find(Place)).to.have.length(0, 'should not be rendered');
    expect(mounted.find(Places)).to.have.length(0, 'should not be rendered');
  });
});
/* end Routes */

/**************************/
/* PART SEVEN: Ice Cream Form */
/**************************/

class IceCreamForm extends React.Component {
  render() {
    return null;
  }
}

xdescribe('<IceCreamForm />', () => {
  it('has state for scoopOne and scoopTwo', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />,
    );
    expect(wrapper.state()).to.eql({
      scoopOne: 'vanilla',
      scoopTwo: 'chocolate',
    });
  });

  it('has 2 input fields', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />,
    );
    const scoopOneInput = wrapper.find('input[name="scoopOne"]');
    const scoopTwoInput = wrapper.find('input[name="scoopTwo"]');
    expect(scoopOneInput.length).to.equal(
      1,
      'could not find input for scoopOne',
    );
    expect(scoopTwoInput.length).to.equal(
      1,
      'could not find input for scoopTwo',
    );
  });

  it('input fields have value props from state', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />,
    );
    const scoopOneInput = wrapper.find('input[name="scoopOne"]');
    const scoopTwoInput = wrapper.find('input[name="scoopTwo"]');

    expect(scoopOneInput.props().value).to.equal('vanilla');
    expect(scoopTwoInput.props().value).to.equal('chocolate');
  });

  it('changing input changes the state', () => {
    const wrapper = shallow(
      <IceCreamForm scoopOne="vanilla" scoopTwo="chocolate" />,
    );
    const scoopOneInput = wrapper.find('input[name="scoopOne"]');
    const scoopTwoInput = wrapper.find('input[name="scoopTwo"]');

    expect(scoopOneInput.props().value).to.equal('vanilla');
    expect(scoopTwoInput.props().value).to.equal('chocolate');
    scoopOneInput.simulate('change', {
      target: { name: 'scoopOne', value: 'strawberry' },
    });
    expect(wrapper.state().scoopOne).to.equal('strawberry');

    scoopTwoInput.simulate('change', {
      target: { name: 'scoopTwo', value: 'coffee' },
    });
    expect(wrapper.state().scoopTwo).to.equal('coffee');
  });
});

/**************************/
/* PART EIGHT: DOM */
/**************************/

const findSpecialIceCream = () => {};

const listAllFlavors = () => {};

const changeFlavorByIndex = () => {};

xdescribe('dom selectors', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div>
        <h1>Acme Ice Cream</h1>
        <h2>Vanilla</h2>
        <h2>Chocolate</h2>
        <h2 class='special'>Coffee</h2>
      </div>
    `;
  });
  describe('findSpecialIceCream', () => {
    it('returns coffee', () => {
      expect(findSpecialIceCream()).to.equal('Coffee');
    });
  });

  describe('listIceCreamFlavors', () => {
    it('returns ice cream flavors', () => {
      expect(listAllFlavors()).to.eql(['Vanilla', 'Chocolate', 'Coffee']);
    });
  });

  describe('changeFlavorByIndex', () => {
    it('modifies the flavor based on its index', () => {
      changeFlavorByIndex(1, 'Rocky Road');
      expect(listAllFlavors()).to.eql(['Vanilla', 'Rocky Road', 'Coffee']);
    });
  });
});

/**************************/
/* PART NINE: Vanilla JS */
/**************************/

const basicIteration = () => {};

const mapIteration = () => {};

const reduceIteration = () => {};

xdescribe('Understanding of Iteration', () => {
  let list;
  beforeEach(() => {
    list = new Array(Math.ceil(Math.random() * 10) + 5)
      .fill('')
      .map(e => Math.floor(Math.random() * 1000));
  });

  describe('Basic', () => {
    it('Can iterate over a list and call a callback on each element', () => {
      const mySpy = chai.spy();
      const forEachSpy = chai.spy.on(list, 'forEach');
      basicIteration(list, mySpy);

      // Dont use forEach!
      expect(forEachSpy).not.to.have.been.called();

      for (let i = 0; i < list.length; ++i) {
        expect(mySpy)
          .on.nth(i + 1)
          .to.be.called.with(list[i]);
      }
    });
  });

  describe('Functional', () => {
    describe('Map', () => {
      it('Can map over a list creating a new list using a callback', () => {
        const mapSpy = chai.spy.on(list, 'map');
        const multiplier = Math.ceil(Math.random() * 30);
        const newList = mapIteration(list, e => e * multiplier);

        // Dont use map!
        expect(mapSpy).not.to.have.been.called();

        for (let i = 0; i < list.length; ++i) {
          expect(newList[i]).to.eql(list[i] * multiplier);
        }
      });
    });

    describe('Reduce', () => {
      it('Can reduce a list', () => {
        const reduceSpy = chai.spy.on(list, 'reduce');
        const reducedDict = reduceIteration(
          list,
          (dict, next) => {
            return {
              ...dict,
              [next]: true,
            };
          },
          {},
        );

        // Dont use reduce!
        expect(reduceSpy).not.to.have.been.called();

        for (let i = 0; i < list.length; ++i) {
          expect(reducedDict[list[i]]).to.eql(true);
        }
      });
    });
  });
});

const recursiveAdder = () => {};

xdescribe('Recursion', () => {
  let recursiveStructure;
  let total = 0;
  beforeEach(() => {
    total = 0;

    const depth = Math.ceil(Math.random() * 10) + 10;
    const widthMin = Math.ceil(Math.random() * 5) + 3;
    const widthVariant = 3;
    const chanceToDive = 25;

    const genNextLevel = (curDepth = 0) => {
      if (curDepth >= depth) return 0;
      const nextStructure = {};

      const widVar = Math.floor(Math.random() * widthVariant);

      for (let i = 0; i < widthMin + widVar; ++i) {
        const curDivChance = Math.random() * 100;

        if (curDivChance < chanceToDive) {
          nextStructure[i] = genNextLevel(curDepth + 1);
        } else {
          const nextVal = Math.ceil(Math.random() * 1000);
          total += nextVal;
          nextStructure[i] = nextVal;
        }
      }

      return nextStructure;
    };

    recursiveStructure = genNextLevel();
  });

  describe('Recursive Adder', () => {
    it('Can dive through the object structure adding all the number values together', () => {
      expect(recursiveAdder(recursiveStructure)).to.eql(total);
    });
  });
});

const uncertainFunc = () => {};

xdescribe('Promises', () => {
  describe('Uncertain', () => {
    it('Returns a resolved value if given true for whether it should resolve', () => {
      const retVal = 'Winston the Aussie';
      const prom = uncertainFunc(true, retVal);

      expect(prom instanceof Promise).to.eql(true);

      return prom
        .then(v => {
          expect(v).to.eql(retVal);
        })
        .catch(() => {
          // Should not fail!
          assert.fail('This promise should not fail!');
        });
    });

    it('Returns a rejected value if given false for whether it should resolve', () => {
      const retVal = 'Winston the Aussie';
      const prom = uncertainFunc(false, retVal);

      expect(prom instanceof Promise).to.eql(true);

      return prom
        .then(() => {
          // Should not succeed!
          assert.fail('This promise should not fail!');
        })
        .catch(v => {
          expect(v).to.eql(retVal);
        });
    });

    const clock = sinon.useFakeTimers();

    it('Delays resolution if given a delay as a third argument', done => {
      const retVal = 'Winston the Aussie';
      const timedProm = uncertainFunc(true, retVal, 500);
      const lessTimedProm = uncertainFunc(true, retVal, 100);

      expect(timedProm instanceof Promise).to.eql(true);

      let timedPromResolved = false;
      let isCorrectOrder = false;
      let errorCaught = false;

      timedProm
        .then(v => {
          timedPromResolved = true;
          expect(v).to.eql(retVal);
          expect(isCorrectOrder).to.eql(true);
        })
        .catch(e => {
          errorCaught = true;
          done(e);
        })
        .finally(() => {
          if (isCorrectOrder && !errorCaught) {
            done();
          }
        });

      lessTimedProm
        .then(() => {
          expect(timedPromResolved).to.eql(false);
          isCorrectOrder = true;
        })
        .catch(done);

      clock.tick(110);

      clock.tick(400);
    });

    clock.restore();
  });
});
