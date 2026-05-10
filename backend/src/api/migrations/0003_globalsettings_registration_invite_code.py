from django.db import migrations, models

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_conto_tipo'),
    ]

    operations = [
        migrations.AddField(
            model_name='globalsettings',
            name='registration_invite_code',
            field=models.CharField(blank=True, help_text='Codice segreto per la registrazione', max_length=50, null=True),
        ),
    ]
