import db from '../models/index';

const createNewRoles = async (roles) => {
    try {

        let currentRoles = await db.role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })

        const persists = roles.filter(({ url: url1 }) =>
            !currentRoles.some(({ url: url2 }) => url1 === url2)
        );
        if (persists.length === 0) {
            return {
                EM: 'Nothing to create ...',
                EC: 0,
                DT: []
            }
        }

        await db.role.bulkCreate(persists);
        return {
            EM: `Create roles succeeds:  ${persists.length} roles...`,
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with servies',
            EC: 1,
            DT: []
        }
    }
}

const getAllRoles = async () => {
    try {
        let data = await db.role.findAll({
            order: [['id', 'DESC']]
        })
        return {
            EM: `Get all Roles succeeds`,
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with servies',
            EC: 1,
            DT: []
        }
    }
}

const deleteRole = async (id) => {
    try {
        let role = await db.role.findOne({
            where: { id: id }
        })
        if (role) {
            await role.destroy();
        }

        return {
            EM: `Delete Roles succeeds`,
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with servies',
            EC: 1,
            DT: []
        }
    }
}

const getRoleByGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: `Not found any roles`,
                EC: 0,
                DT: []
            }
        }

        let roles = await db.group.findOne({
            where: { id: id },
            attributes: ["id", "name", "description"],
            include: {
                model: db.role,
                attributes: ["id", "url", "description"],
                through: { attributes: [] }
            }
        })

        return {
            EM: `get Roles by group succeeds`,
            EC: 0,
            DT: roles
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with servies',
            EC: 1,
            DT: []
        }
    }
}

const assignRoleToGroup = async (data) => {
    try {

        await db.group_role.destroy({
            where: { groupId: +data.groupId }
        })
        await db.group_role.bulkCreate(data.groupRoles);
        return {
            EM: `Assign role to group succeeds`,
            EC: 0,
            DT: []
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrongs with servies',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewRoles, getAllRoles, deleteRole, getRoleByGroup, assignRoleToGroup
}