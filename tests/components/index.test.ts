import { render, screen } from '@testing-library/react';
import { YourComponent } from '../../src/components/ui/button'; // Adjust the import based on your actual component

describe('YourComponent', () => {
    test('renders correctly', () => {
        render(<YourComponent />);
        const element = screen.getByText(/your text/i); // Replace with actual text to check
        expect(element).toBeInTheDocument();
    });

    // Add more tests as needed
});