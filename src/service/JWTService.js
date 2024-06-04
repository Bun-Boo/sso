import db from '../models/index';

const getGroupWithRoles = async (user) => {
    let roles = await db.group.findOne({
        where: { id: user.groupId },
        attributes: ["id", "name", "description"],
        include: {
            model: db.role,
            attributes: ["id", "url", "description"],
            through: { attributes: [] }
        }
    })

    return roles ? roles : {};
}

module.exports = {
    getGroupWithRoles
}