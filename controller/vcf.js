import UserVCF from '../models/UserVcf.js'

export const getUserVCF = async (req, res) => {
    try {
        const userVCF = await UserVCF.findById(req.params.id);

        if (!userVCF) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({
            firstname: userVCF.firstname,
            lastname: userVCF.lastname,
            prefix: userVCF.prefix,
            suffix: userVCF.suffix,
            organization: userVCF.organization,
            title: userVCF.title,
            phone_work: userVCF.phone_work,
            phone_home: userVCF.phone_home,
            address_work: userVCF.address_work,
            address_home: userVCF.address_home,
            address_other: userVCF.address_other,
            email_work: userVCF.email_work,
            nickname: userVCF.nickname,
            photo: userVCF.photo,
            birthday: userVCF.birthday,
            gender: userVCF.gender,
            notes: userVCF.notes,
            website: userVCF.website,
            social_facebook: userVCF.social_facebook,
            social_twitter: userVCF.social_twitter,
            social_linkedin: userVCF.social_linkedin,
            social_instagram: userVCF.social_instagram,
            social_other: userVCF.social_other,
        });
    } catch (err) {
        console.error('Error in getUserVCF:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const createUserVCF = async (req, res) => {
    const userVCF = new UserVCF(req.body);

    try {
        await userVCF.save();

        // Send a success response
        res.json({ message: 'User created successfully', user: userVCF });
    } catch (error) {
        console.error('Error in createUserVCF:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const downloadUserVCF = async (req, res) => {
    try {
        const userVCF = await UserVCF.findById(req.params.id);

        if (!userVCF) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Generate VCF content
        const vcfString = generateVCFContent(userVCF);

        // Set response headers
        res.setHeader('Content-Type', 'text/x-vcard');
        res.setHeader('Content-Disposition', `attachment; filename=${userVCF.firstname}_${userVCF.lastname}.vcf`);

        // Send the file content as the response
        res.send(vcfString);
    } catch (err) {
        console.error('Error in downloadUserVCF:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const generateVCFContent = (userData) => {
    let vcfString = '';

    vcfString += "BEGIN:VCARD\r\n";
    vcfString += "VERSION:3.0\r\n";

    vcfString += `N:${(userData.lastname || '')};${(userData.firstname || '')}\r\n`;
    vcfString += `FN:${userData.lastname} ${userData.firstname}\r\n`;
    vcfString += `NICKNAME:${userData.nickname || ''}\r\n`;
    const base64Image = userData.photo.replace(/^data:image\/(png|jpeg);base64,/, '');
    vcfString += `PHOTO:${base64Image}\r\n`;
    
    if (userData.birthday) {
        const isoFormattedBirthday = new Date(userData.birthday).toISOString().split('T')[0];
        vcfString += `BDAY:${isoFormattedBirthday}\r\n`;
    }

    vcfString += `GENDER:${userData.gender || ''}\r\n`;
    vcfString += `ADR;TYPE=HOME:${userData.address_home || ''}\r\n`;
    vcfString += `ADR;TYPE=WORK:${userData.address_work}\r\n`;
    vcfString += `ADR;TYPE=X-OTHER:${userData.address_other || ''}\r\n`
    vcfString += `TEL;TYPE=HOME:${userData.phone_home}\r\n`;
    vcfString += `TEL;TYPE=WORK:${userData.phone_work}\r\n`;
    vcfString += `TEL;TYPE=FAX:${userData.phone_fax}\r\n`;
    vcfString += `TEL;TYPE=CELL:${userData.phone_cell}\r\n`;
    vcfString += `TEL;TYPE=X-OTHER:${userData.phone_other}\r\n`;
    vcfString += `EMAIL;TYPE=HOME:${userData.email_home}\r\n`;
    vcfString += `EMAIL;TYPE=WORK:${userData.email_work}\r\n`;
    vcfString += `EMAIL;TYPE=X-OTHER:${userData.email_other}\r\n`;
    vcfString += `ORG:${userData.organization || ''}\r\n`;
    vcfString += `TITLE:${userData.title || ''}\r\n`;
    vcfString += `ROLE:${userData.role}\r\n`;
    vcfString += `URL:${userData.website || ''}\r\n`;
    vcfString += `X-SOCIALPROFILE;TYPE=facebook:${userData.social_facebook || ''}\r\n`;
    vcfString += `X-SOCIALPROFILE;TYPE=twitter:${userData.social_twitter || ''}\r\n`;
    vcfString += `X-SOCIALPROFILE;TYPE=linkedin:${userData.social_linkedin || ''}\r\n`;
    vcfString += `X-SOCIALPROFILE;TYPE=instagram:${userData.social_instagram || ''}\r\n`;
    vcfString += `X-SOCIALPROFILE;TYPE=X-OTHER:${userData.social_other || ''}\r\n`;
    vcfString += "NOTE:powered by Tuninnov\r\n"; 
    vcfString += "END:VCARD\r\n";

    return vcfString;
};
