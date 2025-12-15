import { personalInfo, socialLinks } from '../../lib/data-ru';

export default function Contact() {
  return (
    <section id="contact" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
          <p className="text-muted-foreground">
            Свяжитесь со мной удобным способом
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.name} className="flex items-center gap-4 p-4 border rounded-lg hover:border-primary transition-colors">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{link.name}</h3>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name === 'Почта' ? personalInfo.email : 
                     link.name === 'Телефон' ? personalInfo.phone : 
                     `Перейти к ${link.name}`}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}