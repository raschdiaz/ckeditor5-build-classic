import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import {
	addListToDropdown,
	createDropdown
} from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

export default class DynamicDropdown extends Plugin {
	/*eslint-disable*/
	init() {
		const editor = this.editor;
		editor.ui.componentFactory.add('DynamicDropdown', locale => {
			const dropdownView = createDropdown(locale);
			dropdownView.buttonView.set({
				withText: true,
				label: 'Seleccione una opción',
				tooltip: true
			});
			dropdownView.on('execute', event => {
				editor.model.change(writer => {
					const insertPosition = editor.model.document.selection.getFirstPosition();
					writer.insertText(event.source.label, { linkHref: event.source.value }, insertPosition);
				});
			});
			let dropdownItems = editor.config.get('DynamicDropdown.items');
			dropdownItems = dropdownItems ? dropdownItems : [];
			const items = new Collection();
			dropdownItems.forEach(item => {
				items.add({
					type: 'button',
					model: new Model({
						withText: true,
						label: item.label,
						value: item.value
					})
				});
			});
			addListToDropdown(dropdownView, items);
			return dropdownView;
		});
	}
	/*eslint-enable*/
}
