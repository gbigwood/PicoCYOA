// Tags -- why not use div with classname? so that we can make a public JavaScript API
class StoryFull extends HTMLElement {
    connectedCallback() {
        this.addEventListener('transitioned',  e => { console.log('story moving from: ', e.detail.source, 'to:', e.detail.target); });
    }
    //TODO on transition function
};//TODO attribute for the story title?? vs sub tag?
customElements.define('story-container', StoryFull);

class StorySegment extends HTMLElement {
    static get observedAttributes() {
        return ['show', 'id'];
    }
    constructor() {
        super();
        this.show = false;
    }

    get show() {
        return this.hasAttribute('show');
    }

    set show(val) {
        if (val) {
            this.setAttribute('show', '');
        } else {
            this.removeAttribute('show');
        }
    }

    get id() {
        return this.getAttribute('id');
    }

    set id(val) {
        if (val) {
            this.setAttribute('id', val);
        } else {
            this.removeAttribute('id');
        }
    }
};
customElements.define('story-segment', StorySegment);

class SectionContent extends HTMLElement {};
customElements.define('segment-content', SectionContent);

class SegmentChoice extends HTMLElement {
    static get observedAttributes() {
        return ['target', 'condition', 'show'];
    }

    constructor() {
        super();
        //TODO validation of target attribute
        this.show = false;
    }

    get target() {
        //TODO consider making this a data-target instead of just target
        return this.getAttribute('target');
    }

    set target(val) {
        if (val) {
            this.setAttribute('target', '');
        } else {
            this.removeAttribute('target');
        }
    }

    get condition() {
        return this.getAttribute('condition');
    }

    set condition(val) {
        if (val) {
            this.setAttribute('condition', val);
        } else {
            this.removeAttribute('condition');
        }
    }

    connectedCallback() {
        this.addEventListener('click', this.onClick);
        if (this.condition) {
            const theStory = this.closest('story-container');
            theStory.addEventListener('transitioned',  e => { 
                this.show = this.conditionTrue();
            });
        }
        this.show = this.conditionTrue();
    }

    conditionTrue() {
        if (this.condition) {
            const f = eval(this.getAttribute('condition'));
            return f() == true;
        } else { // no condition
            return true;
        }
    }

    get show() {
        return this.hasAttribute('show');
    }

    set show(val) {
        if (val) {
            this.setAttribute('show', '');
        } else {
            this.removeAttribute('show');
        }
    }

    onClick(e) {
        const targetSegmentName = this.getAttribute('target');
        const theStory = this.closest('story-container');
        const expectedTarget = theStory.querySelector("story-segment#"+targetSegmentName);
        if(!expectedTarget) {
            console.log("Could not find expected next segment:", targetSegmentName);
        }
        expectedTarget.show = true;
        const currentSegment = this.closest('story-segment');
        currentSegment.show = false;
        this.dispatchEvent(
            new CustomEvent('transitioned', { bubbles:true, detail: {source: currentSegment.id, target: targetSegmentName } } )
        );
    };
};
customElements.define('segment-choice', SegmentChoice);
