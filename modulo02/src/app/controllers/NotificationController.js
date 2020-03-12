import User from '../models/User';
import Notification from '../schemas/Notification';

class NotificationController {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkIsProvider) {
      res.status(401).json({ error: 'Only provider can load notifications' });
    }

    /**
     * Find used in MongoDB
     */
    const notification = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    res.json(notification);
  }

  async update(req, res) {
    /**
     * Find used in MongoDB, atualiza e retorna o que foi salvo
     */
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(notification);
  }
}

export default new NotificationController();
