import React from 'react';
import { mount } from 'enzyme';
import withLoading from '../withLoading';

describe('withLoading', () => {
    it('renders child when not loading', () => {
        const Child = jest.fn().mockReturnValue(null);
        const Placeholder = jest.fn().mockReturnValue(null);

        const ChildWithLoading = withLoading(Child, Placeholder);
        mount(<ChildWithLoading loading={false} />);

        expect(Child).toHaveBeenCalled();
        expect(Placeholder).not.toHaveBeenCalled();
    });

    it('renders placeholder when loading', () => {
        const Child = jest.fn().mockReturnValue(null);
        const Placeholder = jest.fn().mockReturnValue(null);

        const ChildWithLoading = withLoading(Child, Placeholder);
        mount(<ChildWithLoading loading={true} />);

        expect(Child).not.toHaveBeenCalled();
        expect(Placeholder).toHaveBeenCalled();
    });
});
