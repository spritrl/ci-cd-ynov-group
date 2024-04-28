import { fireEvent, render, screen } from '@testing-library/react';
import Form from './Form';
describe('Form Component Tests', () => {
  test('should have input diabled if all fields are not filled', () => {
    render(<Form />);
    const saveButton = screen.getByText('Sauvegarder');
    expect(saveButton).toBeDisabled();
  });

  const formData = [
    [
      'Realini]',
      'Christophe',
      'chris@gmail.com',
      '2001-06-01',
      'Nice',
      '06000',
      "Le nom n'est pas valide.",
    ],
    [
      'Realini',
      'Christophe]',
      'chris@gmail.com',
      '2001-06-01',
      'Nice',
      '06600',
      "Le prénom n'est pas valide.",
    ],
    [
      'Realini',
      'Christophe',
      'chris@com',
      '2001-06-01',
      'Nice',
      '06000',
      "L'email n'est pas valide.",
    ],
    [
      'Realini',
      'Christophe',
      'chris@gmail.com',
      '2024-06-01',
      'Nice',
      '06000',
      'Vous devez avoir au moins 18 ans.',
    ],
    [
      'Realini',
      'Christophe',
      'chris@gmail.com',
      '2001-06-01',
      'Nice]',
      '06000',
      "La ville n'est pas valide.",
    ],
    [
      'Realini',
      'Christophe',
      'chris@gmail.com',
      '2001-06-01',
      'Nice',
      '0600',
      'Le code postal doit être au format français (5 chiffres).',
    ],
    [
      'Realini',
      'Christophe',
      'chris@gmail.com',
      '2001-06-01',
      'Nice',
      '0600]',
      'Le code postal doit être au format français (5 chiffres).',
    ],
  ];

  test.each(formData)(
    'should show invalid input message when input is invalid',
    async (lastName, firstName, email, birth, city, zip, error) => {
      render(<Form />);

      fireEvent.change(screen.getByPlaceholderText('Nom'), {
        target: { value: lastName },
      });
      fireEvent.change(screen.getByPlaceholderText('Prénom'), {
        target: { value: firstName },
      });
      fireEvent.change(screen.getByPlaceholderText('Adresse e-mail'), {
        target: { value: email },
      });
      fireEvent.change(screen.getByPlaceholderText('Date de naissance'), {
        target: { value: birth },
      });
      fireEvent.change(screen.getByPlaceholderText('Ville'), {
        target: { value: city },
      });
      fireEvent.change(screen.getByPlaceholderText('Code postal'), {
        target: { value: zip },
      });

      fireEvent.click(screen.getByText('Sauvegarder'));

      const errorMessage = await screen.findByText(error);
      expect(errorMessage).toBeInTheDocument();
    }
  );

  test('should show success message when form is valid', async () => {
    render(<Form />);
    fireEvent.change(screen.getByPlaceholderText('Nom'), {
      target: { value: 'Realini' },
    });
    fireEvent.change(screen.getByPlaceholderText('Prénom'), {
      target: { value: 'Christophe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Adresse e-mail'), {
      target: { value: 'chris@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Date de naissance'), {
      target: { value: '2001-06-01' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ville'), {
      target: { value: 'Nice' },
    });
    fireEvent.change(screen.getByPlaceholderText('Code postal'), {
      target: { value: '06000' },
    });
    fireEvent.click(screen.getByText('Sauvegarder'));
    const successMessage = await screen.findByText(
      'Formulaire sauvegardé avec succès !'
    );
    expect(successMessage).toBeInTheDocument();
  });
});
