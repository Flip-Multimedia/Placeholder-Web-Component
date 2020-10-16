
/*
 * (C) Copyright 2020 Flip Multimedia (https://flipweb.co.uk) and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Contributors:
 *  @author James Gibbons <jgibbons@flipweb.co.uk>
 * 
 * 
 */

module.exports.CoreComponent = class PlaceholderComponent {
  
  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getCategory() {
    return 'Content';
  } 

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDescription() {
    return 'Customizable text block component.';
  }

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getDefault() {
    return {};

  }

  /**
   *
   *
   * @static
   * @param {*} component
   * @return {*} 
   */
  static render(component) {
    const getStyles = require(__dirname + '/../../utils.js').componentTypes.getStyles;

    let buttons = "";
    if(component.buttons && component.buttons.length > 0) {
      for(let button of component.buttons) {
        buttons += `<a class="button ${button.class}" href='${button.link}'>${button.title}</a>`;
      }
    }

    return `
      <div data-type='component' data-component-type="${component.type}" class='component-dynamic' style="${getStyles(component, 'wrap')}"></div>
    `;
  }

  /**
   * Creates an instance of PlaceholderComponent.
   * @param {*} component
   */
  constructor(component) {
    this.type = 'textBlockComponent';

    this.title = '';
    this.subTitle = '';
    this.body = '';

    this.styles = {
      wrap: {
        width: '100%',
        height: '100px',
        padding: '25px', 
        'background-color': 'grey'
      }
    };

    if(component.height) {
      this.styles.height = component.height;
    }

    this.defineEditorUI();
  }

  defineEditorUI() {
    const TYPES = require('../../utils.js').componentTypes;
    const ui = new TYPES.EditorUI();

    // UI section for setting the title of the text component. 
    ui.addSection(new TYPES.EditorUISection('Placeholder Dimensions', [
      new TYPES.EditorUIAttribute({
        label: 'Height',
        uiInputType: 'numberPx',

        // update the title attribute of this object.
        isStylesAttribute: true,
        targetStyleElement: 'wrap',
        targetAttribute: 'height'
      })
    ]));

    // section for placehodler background colour
    ui.addSection(new TYPES.EditorUISection('Placeholder Colour'), [
      new TYPES.EditorUIAttribute({
        label: 'Height',
        uiInputType: 'colour',

        // update the title attribute of this object.
        isStylesAttribute: true,
        targetStyleElement: 'wrap',
        targetAttribute: 'background-color'
      })
    ]);

    this.editorUi = ui;
  }

  /**
   *
   *
   * @static
   * @return {*} 
   */
  static getType() {
    return 'placeholderComponent';
  }

  /**
   *
   *
   * @param {*} style
   * @param {*} value
   */
  setStyle(style, value) {
    this.styles[style] = value;
  }

} 